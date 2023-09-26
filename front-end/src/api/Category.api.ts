import { AxiosInstance } from 'axios';

import { ResponseCategoriesInterface, ResponseTagsInterface } from '../../../common/interfaces/Response.interface';
import { SERVICES } from '../../../common/utils/consts';
import RequestHandler from '../../../common/utils/requestHandler';
import DataBaseManager from '../utils/DataBaseManager';

class CategoryApi {
  private static instance: CategoryApi;
  private axios: AxiosInstance;
  private dbManager: DataBaseManager;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
    this.dbManager = DataBaseManager.getInstance();
  }

  static getInstance(axios: AxiosInstance): CategoryApi {
    if (!CategoryApi.instance) {
      CategoryApi.instance = new CategoryApi(axios);
    }

    return CategoryApi.instance;
  }

  async getAllCategories(): Promise<ResponseCategoriesInterface> {
    const categories = await this.dbManager.getServiceData(SERVICES.categoryTag.endpoints.allCategories);

    if (categories) {
      return { categories };
    }

    const { error, data, success } = await RequestHandler(this.axios.get('/category/all-categories'));
    this.dbManager.saveServiceData(success, SERVICES.categoryTag.endpoints.allCategories, data);
    return { error, categories: data, success };
  }

}

export default CategoryApi;
