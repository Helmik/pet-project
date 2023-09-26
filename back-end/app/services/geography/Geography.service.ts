import { ResponseCountriesModelInterface } from '../../interfaces/ServerResponse.interface';
import { Op } from 'sequelize';

import { LANGUAGES } from '../../../../common/utils/consts';
import { FindOptions } from 'sequelize/types';
import RequestHandler from '../../../../common/utils/requestHandler';
import CountryCatModel from '../../db/models/CountryCat.model';
import Log from '../../lib/Log';

const log = new Log('GEOGRAPHY.SERVICE');
const defaultQuery = {
  where: {
    isActive: {
      [Op.eq]: true
    }
  },
  attributes: { exclude: ['createdAt', 'updatedAt', 'isActive'] },
  include: []
};

export default class GeographyService {
  private static _geographyServiceInstance: GeographyService;

  constructor() { }

  static getInstance(): GeographyService {
    if (!GeographyService._geographyServiceInstance) {
      GeographyService._geographyServiceInstance = new GeographyService();
    }

    return GeographyService._geographyServiceInstance;
  }

  async getAllCountries(language: string = LANGUAGES.default, _query?: FindOptions): Promise<ResponseCountriesModelInterface> {
    let query;
    if (_query === undefined) {
      query = JSON.parse(JSON.stringify(defaultQuery));
    } else {
      query = _query;
    }

    query.attributes = this.getLanguageAttributes(language);
    query.where.isActive = { [Op.eq]: true };

    let { error, data } =  await RequestHandler(CountryCatModel.findAll(query));

    if (error || !data) {
      log.error('Error on getAllCountries: ' + error)
      return { error }
    }
    return { countriesModel: data };
  }

  private getLanguageAttributes(language: string): any {
    let name = LANGUAGES.english;

    if (language === LANGUAGES.spanish) {
      name = LANGUAGES.spanish;
    }

    const attributes = ['id', [name, 'name'], 'iso2', 'iso3', 'currencyCode', 'phoneCode'];

    return attributes;
  }
}
