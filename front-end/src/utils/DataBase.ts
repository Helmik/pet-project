import CryptoJS from 'crypto-js';

const dbName = 'db_local';
const mainObjectStorage = 'dataBase'
const keyPath = 'key'
const dbVersion = 1;

export default class DataBase {
  static instance: DataBase;
  indexedDB: any;
  database: any;
  objectStorages: any;

  constructor() {
    // @ts-ignore: Validate indexedDb in different browsers
    this.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;;
    this.objectStorages = {};
  }
  
  static getInstance(): DataBase {
    if (!this.instance) {
      this.instance = new DataBase();
    }

    return this.instance;
  }

  async open(): Promise<any> {
    const self = this;
    
    return new Promise((resolve, reject) => {
      if (self.database) {
        return resolve(self.database);
      }

      const request = self.indexedDB.open(dbName, dbVersion);
  
      request.onsuccess = () => {
        self.database = request.result
        resolve(self.database);
      }
  
      request.onupgradeneeded = (e: any) => {
        self.database = e.target.result;
        
        // Create Object storages
        self.createObjetStorage();
        resolve(self.database);
      }
  
      request.onerror = (error: any) => {
        console.error('Error on open database ' + dbName + ':', error)
        reject({ error: 'Error on open database ' + dbName + ':' + error });
      }
    })
  }

  private createObjetStorage(): Promise<any> {
    return new Promise(resolve => {
      const objectStore = this.database.createObjectStore(mainObjectStorage, { keyPath });
      objectStore.transaction.oncomplete = () => {
        resolve(objectStore);
      }
    })
  }

  async addData(key: string, data: any): Promise<void> {
    await this.open();
    if (!this.database) {
      return console.error('Add data could not be completed successfully. Dabase does not exist.');
    }

    const transaction = this.database.transaction(mainObjectStorage, 'readwrite');
    const objectStore = transaction.objectStore(mainObjectStorage);
    objectStore.add({ [keyPath]: key,  data: this.encrypt(data)});
  }

  async getData(key: string): Promise<any> {
    const self = this;
    await this.open();
    return new Promise(resolve => {
      if (!self.database) {
        console.error('Get data could not be completed successfully. Dabase does not exist.');
        return resolve(undefined);
      }

      const transaction = this.database.transaction(mainObjectStorage, 'readonly');
      const objectStore = transaction.objectStore(mainObjectStorage);
      const request = objectStore.get(key);
      request.onsuccess = () => {
        try {
          const data = request && request.result && request.result.data ? request.result.data : undefined;
          if (!data) {
            return resolve(undefined);
          }
          return resolve(this.decrypt(data));
        } catch(error) {
          console.error(error);
          return resolve(undefined);
        }
      }
    });
  }

  async removeData(key: string): Promise<void> {
    const self = this;
    await this.open();

    return new Promise(resolve => {
      if (!self.database) {
        console.error('Remove data could not be completed successfully. Dabase does not exist.');
        return resolve(undefined);
      }

      const transaction = this.database.transaction(mainObjectStorage, 'readwrite');
      const objectStore = transaction.objectStore(mainObjectStorage);
      objectStore.delete(key);

      resolve();
    });
  }

  setLocal(key: string, data: any): void {
    localStorage.setItem(key, this.encrypt(data));
  }

  getLocal(key: string): any | undefined {
    const data = localStorage.getItem(key);
    if (data) {
      return this.decrypt(data);
    }
    return undefined
  }

  encrypt(data: any): string {
    let d = data;
    const secret = process.env.REACT_APP_SECRET || 'secret';
    if (typeof data === 'object') {
      d = JSON.stringify(data);
    }

    return CryptoJS.AES.encrypt(d, secret).toString();
  }

  decrypt(data: string): any {
    const secret = process.env.REACT_APP_SECRET || 'secret';
    const bytes  = CryptoJS.AES.decrypt(data, secret);
    const original = bytes.toString(CryptoJS.enc.Utf8);
    if (original === '') {
      return undefined;
    }
    return JSON.parse(original);
  }
} 
