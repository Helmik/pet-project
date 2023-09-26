import { MxLocalityInterface } from '../../../common/interfaces/MxGeography.interface'
import RequestHandler from '../../../common/utils/requestHandler';

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

class Geolocation {
  private localities: MxLocalityInterface[];

  constructor(localities: MxLocalityInterface[]) {
    this.localities = localities;
  }

  private deg2Rad(deg: number): number {
    return deg * Math.PI / 180;
  }

  private pythagorasEquirectangular(lat1: number, lng1: number, lat2: number, lng2: number) {
    var _lat1 = this.deg2Rad(lat1);
    var _lat2 = this.deg2Rad(lat2);
    var _lng1 = this.deg2Rad(lng1);
    var _lng2 = this.deg2Rad(lng2);
    var R = 6371 * 1000; // Radious of the earth in meters
    var x = (_lng2 - _lng1) * Math.cos((_lat1 + _lat2) / 2);
    var y = (_lat2 - _lat1);
    var d = Math.sqrt(x * x + y * y) * R;
    return d;
  }

  sortByLocation(lat: number, lng: number): MxLocalityInterface[] {
    return this.localities.sort((a: MxLocalityInterface, b: MxLocalityInterface): number => {
      const d1 = this.pythagorasEquirectangular(lat, lng, a.lat, a.lng);
      const d2 = this.pythagorasEquirectangular(lat, lng, b.lat, b.lng);

      if (d1 < d2) { return -1 }
      if (d1 > d2) { return 1 }
      return 0;
    })
  }

  sortByName(): MxLocalityInterface[] {
    return this.localities.sort((a: MxLocalityInterface, b: MxLocalityInterface): number => {
      const name1 = a.name.toLocaleLowerCase().replace(/á/g,'a').replace(/é/g,'e').replace(/í/g,'i').replace(/ó/g,'o').replace(/ú/g,'ú');
      const name2 = b.name.toLocaleLowerCase().replace(/á/g,'a').replace(/é/g,'e').replace(/í/g,'i').replace(/ó/g,'o').replace(/ú/g,'ú');

      if (name1 < name2) { return -1; }
      if (name1 > name2) { return 1; }
      return 0;
    })
  }

  async sort() {
    let loc: MxLocalityInterface[];
    const currentPosition = await RequestHandler(this.getPosition());

    if (currentPosition.data) {
      loc = this.sortByLocation(currentPosition.data.latitude, currentPosition.data.longitude);
    } else {
      loc = this.sortByName();
    }

    return loc
  }

  private getPosition(): Promise<any> {
    if (navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position.coords),
          (error) => reject(error),
          options
        );
      });
    }
    return Promise.reject(null);
  }
}

export default Geolocation;
