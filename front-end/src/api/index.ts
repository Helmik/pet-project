import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

import UsersApi from './Users.api';
import GeographyApi from './Geography.api';
import CategoryApi from './Category.api';
import AddressApi from './Address.api';
import DataBaseManager from '../utils/DataBaseManager';
import { LANGUAGES } from '../../../common/utils/consts';
import DataBase from "../utils/DataBase";

const dataBase = new DataBase();
const PROTOCOL = 'http';
const URL = 'localhost';
const PORT = '8001';
const BASE_URL = `${PROTOCOL}://${URL}:${PORT}/`;
const dbManager = DataBaseManager.getInstance();

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'lng': LANGUAGES.english,
    'Accept': 'application/json'
  }
});

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const lngConfig = JSON.parse(localStorage.getItem('lng') || '{}');
  const lng = lngConfig.languageCode ? lngConfig.languageCode.toLowerCase() : 'en';
  const flag = lngConfig.flagCode ? lngConfig.flagCode : 'US';
  const user = dataBase.getLocal('user');

  api.defaults.headers.lng = lng;
  api.defaults.headers.country = flag;
  api.defaults.headers['Content-Type'] = 'application/json';
  api.defaults.headers['Access-Control-Allow-Origin'] = '*';
  api.defaults.headers['mode'] = 'no-cors';

  if (user && user.token) {
    api.defaults.headers.Authorization = `Bearer ${user.token}`;
    api.defaults.headers.uid = user.id;
  }

  return config;
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
  
  if (response && response.data && response.data.success && response.data.success.servicesVersion) {
    const sv = response.data.success.servicesVersion;
    dbManager.checkServices(sv);
  }

  return response;
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
}

function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}

const apiInstance = setupInterceptorsTo(api)
const usersApi = UsersApi.getInstance(apiInstance);
const geographyApi = GeographyApi.getInstance(apiInstance);
const categoryApi = CategoryApi.getInstance(apiInstance);
const addressApi = AddressApi.getInstance(apiInstance);

export {
  usersApi,
  geographyApi,
  categoryApi,
  addressApi
};
