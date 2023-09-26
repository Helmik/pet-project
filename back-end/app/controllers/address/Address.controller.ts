import express, { Request, Response } from 'express';

import AddressService from '../../services/address/Address.service'
import { ERRORS, SUCCESS } from '../../utils/serverMessages';
import { RESPONSE_CODES } from '../../../../common/utils/consts';
import { jsonError, jsonSuccess } from '../../lib/Response';
import Log from '../../lib/Log';
import { bodyValidator } from '../../middlewares/request/RequestValidator';
import { ResponseAddressInterface } from '../../../../common/interfaces/Response.interface';
import authMiddleware from '../../middlewares/auth/Auth.middleware';


const AddressController =  express.Router();
const log = new Log('ADDRESS.CONTROLLER');
const addressServiceInstance = AddressService.getInstance();

AddressController.get('/get-all', authMiddleware, async (req: Request, res: Response) => {
  const userId = req.body.user.id;

  const { error, addressesModel } = await addressServiceInstance.getAddressesByUserId(userId);

  if (error || !addressesModel) {
    const e = error || ERRORS.noDataError;
    log.error(e.message);
    return jsonError(res, RESPONSE_CODES.error, e);
  }

  return jsonSuccess(res, addressesModel, RESPONSE_CODES.success, SUCCESS.getSuccess);
});

const requiredAttributes = ['street', 'streetNumber', 'lat', 'lng', 'countryId', 'mxStateId', 'mxMunicipalityId'];
AddressController.post('/new-address', authMiddleware, bodyValidator(requiredAttributes), async (req: Request, res: Response) => {
  const data = {
    userId: req.body.user.id,
    ...req.body
  };
  const addressCreated: ResponseAddressInterface = addressServiceInstance.buildFromObject(data);

  if (addressCreated.error || !addressCreated.address) {
    return jsonError(res, RESPONSE_CODES.error, addressCreated.error || ERRORS.addressCreationError);
  }

  const { error, addressModel } = await addressServiceInstance.createAddress(addressCreated.address);

  if (error) {
    log.error('Error on /new-address: ' + error.message);
    return jsonError(res, RESPONSE_CODES.error, error);
  }

  if (addressModel) {
    return jsonSuccess(res, addressModel, RESPONSE_CODES.success, SUCCESS.getSuccess);
  }
});

export default AddressController;
