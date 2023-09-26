import {
  ResponseMxMunicipalityModelInterface,
  ResponseMxStateModelInterface,
  ResponseLocalityModelInterface,
  ResponseCountryModelInterface,
  ResponseCountriesModelInterface
} from '../../interfaces/ServerResponse.interface';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import RequestHandler from '../../../../common/utils/requestHandler';
import Log from '../../lib/Log';
import { FindOptions } from 'sequelize/types';
import MxStateCatModel from '../../db/models/MxStateCat.model';
import MxMunicipalityCatModel from '../../db/models/MxMunicipalityCat.model';
import MxLocalityCatModel from '../../db/models/MxLocalityCat.model';
import GeographyService from './Geography.service';
import { MX_ALLOWED } from '../../../../common/utils/consts';
import { ResponseAnyInterface } from '../../../../common/interfaces/Response.interface';

const log = new Log('GEOGRAPHY-MX.SERVICE');
const defaultQuery: FindOptions = {
  where: {
    isActive: {
      [Op.eq]: true
    }
  },
  attributes: { exclude: ['createdAt', 'updatedAt', 'isActive'] },
  include: []
};

export default class GeographyMxService {
  private static _geographyMxServiceInstance: GeographyMxService;

  constructor() { }

  static getInstance(): GeographyMxService {
    if (!GeographyMxService._geographyMxServiceInstance) {
      GeographyMxService._geographyMxServiceInstance = new GeographyMxService();
    }

    return GeographyMxService._geographyMxServiceInstance;
  }

  async getAllStates(query: FindOptions = defaultQuery): Promise<ResponseMxStateModelInterface> {
    let { error, data } =  await RequestHandler(MxStateCatModel.findAll(query));

    if (error || !data) {
      log.error('Error on getAllStates:' + error)
      return { error }
    }
    return { mxStateModel: data };
  }

  async getAllMunicipalities(query: FindOptions = defaultQuery): Promise<ResponseMxMunicipalityModelInterface> {
    let { error, data } =  await RequestHandler(MxMunicipalityCatModel.findAll(query));

    if (error || !data) {
      log.error('Error on getAllMunicipalites:' + error)
      return { error }
    }
    return { mxMunicipalityModel: data }
  }

  async getAllowedStates(): Promise<ResponseMxStateModelInterface> {
    const query = JSON.parse(JSON.stringify(defaultQuery));
    query.where.isActive = {[Op.eq]: true};
    return this.getAllStates(query);
  }

  async getAllowedMunicipalities(): Promise<ResponseMxMunicipalityModelInterface> {
    const query = JSON.parse(JSON.stringify(defaultQuery));
    query.where.isActive = {[Op.eq]: true};
    return this.getAllMunicipalities(query);
  }
  async getStateMunicipalitySuburbsStructure(lng: string, stateId: number, municipalityId: number): Promise<ResponseCountriesModelInterface> {
    const geographyServiceInstance = GeographyService.getInstance();

    const includeLocalities = {
      model: MxLocalityCatModel,
      attributes: ['id', 'name', 'lat', 'lng', 'geopoint', 'mxMunicipalityId'],
      where: {
        isActive: {
          [Op.eq]: true
        }
      }
    };

    const includeMunicipalities = {
      model: MxMunicipalityCatModel,
      attributes: ['id', 'name', 'lat', 'lng', 'geopoint', 'mxStateId'],
      where: {
        isActive: {
          [Op.eq]: true
        },
        id: {
          [Op.eq]: municipalityId
        }
      },
      include: [includeLocalities]
    };

    const includeStates = {
      model: MxStateCatModel,
      attributes: ['id', 'name', 'countryId'],
      where: {
        isActive: {
          [Op.eq]: true
        },
        id: {
          [Op.eq]: stateId
        }
      },
      include: [includeMunicipalities]
    };

    const query = JSON.parse(JSON.stringify(defaultQuery));
    query.where.isActive = {[Op.eq]: true};
    query.where.id = {[Op.eq]: MX_ALLOWED.id};
    query.include = [includeStates];
    return geographyServiceInstance.getAllCountries(lng, query);
  }
  
  async getAllowedLocalities(): Promise<ResponseLocalityModelInterface> {
    const query = JSON.parse(JSON.stringify(defaultQuery));
    query.where.isActive = {[Op.eq]: true};
    query.attributes.exclude.push('localityType');
    query.attributes.exclude.push('geoPoint');
    query.attributes.exclude.push('inegiCode');
    let { error, data } =  await RequestHandler(MxLocalityCatModel.findAll(query));

    if (error || !data) {
      log.error('Error on getAllTags:' + error)
      return { error }
    }
    return { mxLocalityModel: data }
  }

  async getStateMunicipalityLocalitiesStructure(lng: string, stateId: number, municipalityId: number): Promise<ResponseCountryModelInterface> {
    const geographyServiceInstance = GeographyService.getInstance();

    const includeLocalities = {
      model: MxLocalityCatModel,
      attributes: ['id', 'name', 'lat', 'lng', 'mxMunicipalityId'],
      where: {
        isActive: {
          [Op.eq]: true
        }
      },
    };

    const includeMunicipalities = {
      model: MxMunicipalityCatModel,
      attributes: ['id', 'name', 'mxStateId'],
      where: {
        isActive: {
          [Op.eq]: true
        },
        id: {
          [Op.eq]: municipalityId
        }
      },
      include: [includeLocalities]
    };

    const includeStates = {
      model: MxStateCatModel,
      attributes: ['id', 'name', 'countryId'],
      where: {
        isActive: {
          [Op.eq]: true
        },
        id: {
          [Op.eq]: stateId
        }
      },
      include: [includeMunicipalities]
    };

    const query = JSON.parse(JSON.stringify(defaultQuery));
    query.where.isActive = {[Op.eq]: true};
    query.where.id = {[Op.eq]: MX_ALLOWED.id};
    query.include = [includeStates];
    return geographyServiceInstance.getAllCountries(lng, query);
  }

  // TODO: deprecated function (localities will be removed)
  async getLocalitiesByPoint(lat: number, lng: number): Promise<ResponseAnyInterface> {
    const location = Sequelize.literal(`ST_GeomFromText('POINT(${ lng } ${  lat })')`);
    const distance = Sequelize.fn('ST_Distance_Sphere', Sequelize.literal('geoPoint'), location);
    const radius = 500000;
    const query = {
      order: distance,
      where: {
        [Op.and]: [Sequelize.where(distance, { [Op.lte]: radius }), { isActive: true }]
      },
      attributes: { exclude: ['localityType', 'geoPoint', 'inegiCode', 'createdAt', 'updatedAt', 'isActive'] },
      logging: console.log
    };

    console.log(query);
    return await RequestHandler(MxLocalityCatModel.findAll(query));
  }

}
