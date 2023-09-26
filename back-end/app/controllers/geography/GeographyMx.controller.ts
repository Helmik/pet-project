import express, { Request, Response } from 'express';

import { ERRORS, SUCCESS } from '../../utils/serverMessages';
import { RESPONSE_CODES } from '../../../../common/utils/consts';
import { jsonError, jsonSuccess } from '../../lib/Response';
import Log from '../../lib/Log';
import GeographyMxService from '../../services/geography/GeographyMx.service';
import { getLngFromHeaders } from '../../utils/utils';
import { queryValidator } from '../../middlewares/request/RequestValidator';

const GeographyMxController =  express.Router();
const geographyServiceInstance = GeographyMxService.getInstance();
const log = new Log('GEOGRAPHY-MX.CONTROLLER');

GeographyMxController.get('/all-states', async (req: Request, res: Response) => {
  const { error, mxStateModel } = await geographyServiceInstance.getAllStates();

  if (error || !mxStateModel) {
    const e = error || ERRORS.noDataError;
    log.error(e.message);
    return jsonError(res, RESPONSE_CODES.error, e);
  }

  return jsonSuccess(res, mxStateModel, RESPONSE_CODES.success, SUCCESS.getSuccess);
});

GeographyMxController.get('/all-municipalities', async (req: Request, res: Response) => {
  const { error, mxMunicipalityModel } = await geographyServiceInstance.getAllMunicipalities();

  if (error || !mxMunicipalityModel) {
    const e = error || ERRORS.noDataError;
    log.error(e.message);
    return jsonError(res, RESPONSE_CODES.error, e);
  }

  return jsonSuccess(res, mxMunicipalityModel, RESPONSE_CODES.success, SUCCESS.getSuccess);
});

GeographyMxController.get('/allowed-states', async (req: Request, res: Response) => {
  const { error, mxStateModel } = await geographyServiceInstance.getAllowedStates();

  if (error || !mxStateModel) {
    const e = error || ERRORS.noDataError;
    log.error(e.message);
    return jsonError(res, RESPONSE_CODES.error, e);
  }

  return jsonSuccess(res, mxStateModel, RESPONSE_CODES.success, SUCCESS.getSuccess);
});

GeographyMxController.get('/allowed-municipalities', async (req: Request, res: Response) => {
  const { error, mxMunicipalityModel } = await geographyServiceInstance.getAllowedMunicipalities();

  if (error || !mxMunicipalityModel) {
    const e = error || ERRORS.noDataError;
    log.error(e.message);
    return jsonError(res, RESPONSE_CODES.error, e);
  }

  return jsonSuccess(res, mxMunicipalityModel, RESPONSE_CODES.success, SUCCESS.getSuccess);
});

GeographyMxController.get('/allowed-localities', async (req: Request, res: Response) => {
  const { error, mxLocalityModel } = await geographyServiceInstance.getAllowedLocalities();

  if (error || !mxLocalityModel) {
    const e = error || ERRORS.noDataError;
    log.error(e.message);
    return jsonError(res, RESPONSE_CODES.error, e);
  }

  return jsonSuccess(res, mxLocalityModel, RESPONSE_CODES.success, SUCCESS.getSuccess);
});

GeographyMxController.get('/full-allowed-structure', queryValidator(['stateId', 'municipalityId']), async (req: Request, res: Response) => {
  const lng = getLngFromHeaders(req);
  const stateId = Number(req.query.stateId) || 23;
  const municipalityId = Number(req.query.municipalityId) || 23009;
  const { error, countriesModel } = await geographyServiceInstance.getStateMunicipalitySuburbsStructure(lng, stateId, municipalityId);

  if (error || (countriesModel && countriesModel.length === 0)) {
    const e = error || ERRORS.noDataError;
    log.error(e.message);
    return jsonError(res, RESPONSE_CODES.error, e);
  }

  return jsonSuccess(res, countriesModel, RESPONSE_CODES.success, SUCCESS.getSuccess);
});

GeographyMxController.get('/localities-position', async (req: Request, res: Response) => {
  const { error, data } = await geographyServiceInstance.getLocalitiesByPoint(20.2108, -87.4632);

  if (error || !data) {
    const e = error || ERRORS.noDataError;
    log.error(e.message);
    return jsonError(res, RESPONSE_CODES.error, e);
  }

  return jsonSuccess(res, data, RESPONSE_CODES.success, SUCCESS.getSuccess);
});

export default GeographyMxController;
