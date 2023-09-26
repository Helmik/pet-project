import { debounce } from '@mui/material';
import { AxiosInstance } from 'axios';

import { ResponseCountriesInterface } from '../../../common/interfaces/Response.interface';
import { SERVICES } from '../../../common/utils/consts';
import RequestHandler from '../../../common/utils/requestHandler';
import DataBaseManager from '../utils/DataBaseManager';

class GeographyApi {
  private static instance: GeographyApi;
  private axios: AxiosInstance;
  private dbManager: DataBaseManager;
  
  constructor(axios: AxiosInstance) {
    this.axios = axios;
    this.dbManager = DataBaseManager.getInstance();
  }

  static getInstance(axios: AxiosInstance): GeographyApi {
    if (!GeographyApi.instance) {
      GeographyApi.instance = new GeographyApi(axios);
    }

    return GeographyApi.instance;
  }

  async getAllCountries(): Promise<ResponseCountriesInterface> {
    return new Promise(resolve => {
      debounce(async () => {
        const countries = await this.dbManager.getServiceData(SERVICES.geography.endpoints.allCountries);

        if (countries) {
          return resolve({ countries });
        }

        const { error, data, success } = await RequestHandler(this.axios.get('/geography/all-countries'));
        this.dbManager.saveServiceData(success, SERVICES.geography.endpoints.allCountries, data);
        return resolve({ error, countries: data, success });
      }, 300)();
    })
  }

  getFullAllowedStructure(stateId: number, municipalityId: number): Promise<ResponseCountriesInterface> {
    return new Promise(resolve => {
      debounce(async () => {
        const countries = await this.dbManager.getServiceData(SERVICES.geography.endpoints.fullAllowedStructure);
    
        if (countries) {
          return resolve({ countries });
        }
    
        const { error, data, success } = await RequestHandler(this.axios.get('/geography/mx/full-allowed-structure', { params: { stateId, municipalityId}}));
        this.dbManager.saveServiceData(success, SERVICES.geography.endpoints.fullAllowedStructure, data);
        return resolve({ error, countries: data, success });
      }, 300)();
    })
  }

}

export default GeographyApi;
