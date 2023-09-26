import { ResponseAddressesModelInterface, ResponseAddressModelInterface } from '../../interfaces/ServerResponse.interface';

import RequestHandler from '../../../../common/utils/requestHandler';
import { ALLOWED_COINTRIES, LANGUAGES } from '../../../../common/utils/consts';
import Log from '../../lib/Log';
import AddressModel from '../../db/models/Address.model';
import AddressInterface from '../../../../common/interfaces/Address.interface';
import { ResponseAddressInterface } from '../../../../common/interfaces/Response.interface';
import { ERRORS } from '../../utils/serverMessages';
import { createGeoPointObject } from '../../utils/utils';
import GeographyMxService from '../../services/geography/GeographyMx.service';

const log = new Log('ADDRESS.SERVICE');

export default class AddressService {
  private static _addressServiceInstance: AddressService;

  constructor() { }

  static getInstance(): AddressService {
    if (!AddressService._addressServiceInstance) {
      AddressService._addressServiceInstance = new AddressService();
    }

    return AddressService._addressServiceInstance;
  }

  async getAddressesByUserId(userId: number = -1): Promise<ResponseAddressesModelInterface> {
    const query = {
      where: {
        userId: userId
      }
    };

    let { error, data } =  await RequestHandler(AddressModel.findAll(query));

    if (error || !data) {
      log.error('Error on getAddressesByUserId:' + JSON.stringify(error));
      return { error: ERRORS.getAddressError }
    }
    return { addressesModel: data }
  }

  async createAddress(address: AddressInterface): Promise<ResponseAddressModelInterface> {
    const isAreaValid = await this.isAreaValid(address.countryId, address.mxStateId, address.mxMunicipalityId);
    if (!isAreaValid) {
      log.error(ERRORS.areaNotSupported.message);
      return { error: ERRORS.areaNotSupported };
    }

    const { error, data} = await RequestHandler(AddressModel.create(address));

    if (error || !data) {
      log.error('Error on createAddress: ' + JSON.stringify(error));
      return { error: ERRORS.addressCreationError };
    }

    return { addressModel: data };
  }

  buildFromObject(obj: any): ResponseAddressInterface {
    const newAddress: AddressInterface = {
      id: obj.id,
      street: obj.street,
      streetNumber: obj.streetNumber,
      apartmentNumber: obj.apartmentNumber,
      details: obj.details,
      lat: obj.lat,
      lng: obj.lng,
      geoPoint: obj.geoPoint,
      isActive: obj.isActive,
      createdAt: obj.createdAt,
      updatedAt: obj.updatedAt,
      countryId: obj.countryId,
      mxStateId: obj.mxStateId,
      mxMunicipalityId: obj.mxMunicipalityId,
      mxLocalityId: obj.mxLocalityId,
      userId: obj.userId
    }

    if (!newAddress.street || !newAddress.streetNumber || !newAddress.lat || !newAddress.lng || !newAddress.countryId || !newAddress.mxStateId || !newAddress.mxMunicipalityId || !newAddress.userId) {
      log.error(ERRORS.addressBuildError.message + '\n' + JSON.stringify(newAddress));
      return { error: ERRORS.addressBuildError };
    }

    if (!newAddress.geoPoint && newAddress.lat && newAddress.lng) {
      newAddress.geoPoint = createGeoPointObject(newAddress.lat, newAddress.lng);
    }

    if (isNaN(parseInt(newAddress.mxLocalityId + ''))) {
      newAddress.mxLocalityId = undefined;
    }

    return { address: newAddress };
  }

  async isAreaValid(countryId: number, mxStateId: number, mxMunicipalityId: number): Promise<boolean> {
    const geographyServiceInstance = GeographyMxService.getInstance();
    const lng = LANGUAGES.default;

    if (countryId != ALLOWED_COINTRIES.mexico) {
      return false;
    }

    const { error, countriesModel } = await geographyServiceInstance.getStateMunicipalitySuburbsStructure(lng, mxStateId, mxMunicipalityId);

    if (error || (countriesModel && countriesModel.length === 0)) {
      return false;
    }

    return true;
  }

}
