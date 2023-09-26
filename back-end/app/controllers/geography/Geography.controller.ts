import express, { Request, Response } from 'express';

import { ERRORS, SUCCESS } from '../../utils/serverMessages';
import { LANGUAGES, RESPONSE_CODES } from '../../../../common/utils/consts';
import { jsonError, jsonSuccess } from '../../lib/Response';
import Log from '../../lib/Log';
import GeographyService from '../../services/geography/Geography.service';

const GeographyController =  express.Router();
const log = new Log('GEOGRAPHY.CONTROLLER');
const geographyServiceInstance = GeographyService.getInstance();

GeographyController.get('/all-countries', async (req: Request, res: Response) => {
  let { lng } = req.headers;
  lng = lng ? lng.toString() : LANGUAGES.default;
  const { error, countriesModel } = await geographyServiceInstance.getAllCountries(lng);

  if (error || !countriesModel) {
    const e = error || ERRORS.noDataError;
    log.error(e.message);
    return jsonError(res, RESPONSE_CODES.error, e);
  }

  return jsonSuccess(res, countriesModel, RESPONSE_CODES.success, SUCCESS.getSuccess);
});

export default GeographyController;
