import { ResponseCategoryModelInterface } from '../../interfaces/ServerResponse.interface';
import { Op } from 'sequelize';

import RequestHandler from '../../../../common/utils/requestHandler';
import Log from '../../lib/Log';
import CategoryCatModel from '../../db/models/CategoryCat.model';
import { FindOptions } from 'sequelize/types';
import { LANGUAGES } from '../../../../common/utils/consts';

const log = new Log('CATEGORY.SERVICE');
const defaultQuery: FindOptions = {
  where: {
    isActive: {
      [Op.eq]: true
    }
  },
  attributes: { exclude: ['createdAt', 'updatedAt', 'isActive'] },
  include: []
};

export default class CategoryService {
  private static _categoryServiceInstance: CategoryService;

  constructor() { }

  static getInstance(): CategoryService {
    if (!CategoryService._categoryServiceInstance) {
      CategoryService._categoryServiceInstance = new CategoryService();
    }

    return CategoryService._categoryServiceInstance;
  }

  private getLanguageAttributes(language: string, isCategoryTable: boolean = false): any {
    let name = LANGUAGES.english;
    let description = 'descriptionEn';

    if (language === LANGUAGES.spanish) {
      name = LANGUAGES.spanish;
      description = 'descriptionEs';
    }

    const attributes = ['id', [name, 'name']]

    if (isCategoryTable) {
      attributes.push([description, 'description']);
      attributes.push('images');
      attributes.push('url');
    }

    return attributes;
  }

  async getAllCategories(language: string = LANGUAGES.default, _query: FindOptions = defaultQuery): Promise<ResponseCategoryModelInterface> {
    const query = JSON.parse(JSON.stringify(defaultQuery));
    query.attributes = this.getLanguageAttributes(language, true);
    query.where.isActive = { [Op.eq]: true };

    let { error, data } =  await RequestHandler(CategoryCatModel.findAll(query));

    if (error || !data) {
      log.error('Error on getAllCategories:' + error)
      return { error }
    }
    return { categoryModel: data };
  }
}
