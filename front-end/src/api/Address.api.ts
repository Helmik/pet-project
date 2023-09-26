import { AxiosInstance } from 'axios';
import { debounce } from '@mui/material';

import { ResponseAddressesInterface, ResponseAddressInterface } from '../../../common/interfaces/Response.interface';
import RequestHandler from '../../../common/utils/requestHandler';
import AddressInterface from '../../../common/interfaces/Address.interface';

class AddressApi {
  private static instance: AddressApi;
  private axios: AxiosInstance;
  private baseUrl = '/address/'

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  static getInstance(axios: AxiosInstance): AddressApi {
    if (!AddressApi.instance) {
      AddressApi.instance = new AddressApi(axios);
    }

    return AddressApi.instance;
  }

  async getAddressByUserId(userId: number): Promise<ResponseAddressesInterface> {
    return new Promise(resolve => {
      debounce(async () => {
        const { error, data, success } = await RequestHandler(this.axios.get(`${this.baseUrl}get-all`, { params: { userId }}));
        return resolve({ error, addresses: data, success });
      }, 300)();
    })
  }

  async createNewAddress(address: AddressInterface): Promise<ResponseAddressInterface> {
    return new Promise(resolve => {
      debounce(async () => {
        const { error, data, success } = await RequestHandler(this.axios.post(`${this.baseUrl}new-address`, { params: address }));
        return resolve({ error, address: data, success });
      }, 300)();
    });
  }
}

export default AddressApi;
