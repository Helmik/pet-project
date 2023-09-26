import DataBase from './DataBase';
import { SuccessMessageInterface } from '../../../common/interfaces/Response.interface';

const servicesVersion = 'servicesVersion';

export default class DataBaseManager {
  static instance: DataBaseManager;
  private dataBase: DataBase | undefined = undefined;

  constructor() {
    this.initDataBase();
  }
  
  static getInstance(): DataBaseManager {
    if (!this.instance) {
      this.instance = new DataBaseManager();
    }
    return this.instance;
  }

  initDataBase(): void {
    if (!this.dataBase) {
      this.dataBase = DataBase.getInstance();
    }
  }

  async saveServiceData(success: SuccessMessageInterface | undefined, key: string, data: any): Promise<void> {
    if (data === undefined) { return; }

    this.initDataBase();
    if (!this.dataBase) { return }

    this.dataBase.addData(key, data);

    const sv = await this.dataBase.getData(servicesVersion);
    if (sv) {
      this.dataBase.removeData(servicesVersion);
    }

    if (success) {
      this.dataBase.addData(servicesVersion, success.servicesVersion);
    }

    const lng = localStorage.getItem('lng');
    localStorage.setItem(`${key}-lng`, lng || '');
  }

  async getServiceData(key: string): Promise<any> {
    this.initDataBase();
    const lng = localStorage.getItem('lng');
    const serviceLng = localStorage.getItem(`${key}-lng`);

    if (lng !== serviceLng || !this.dataBase) {
      this.dataBase?.removeData(key);
      return Promise.resolve(undefined);
    }

    return this.dataBase.getData(key)
  }


  // Compare services versions object sended by back-end with SV objevt saved in localStorage
  async checkServices(svServer: any): Promise<void> {
    this.initDataBase();
    if (!this.dataBase) { return }

    const svLocal = await this.dataBase.getData(servicesVersion);
    if (!svLocal) { return }

    for(let name in svServer) {
      if (svLocal[name] && svLocal[name].version !== svServer[name]) {
        for (let endpoint in svLocal[name].endpoints) {
          // this.dataBase?.removeData(endpoint);
        }
      }
    }
  }
}
