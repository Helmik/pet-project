import express, { Request, Response } from 'express';

import CategoryService from '../../services/category/Category.service'
import { ERRORS, SUCCESS } from '../../utils/serverMessages';
import { LANGUAGES, RESPONSE_CODES } from '../../../../common/utils/consts';
import { jsonError, jsonSuccess } from '../../lib/Response';
import Log from '../../lib/Log';

const CategoryController =  express.Router();
const log = new Log('CATEGORY.CONTROLLER');
const categoryServiceInstance = CategoryService.getInstance();

CategoryController.get('/all-categories', async (req: Request, res: Response) => {
  let { lng } = req.headers;
  lng = lng ? lng.toString() : LANGUAGES.default;
  const { error, categoryModel } = await categoryServiceInstance.getAllCategories(lng);

  if (error || !categoryModel) {
    const e = error || ERRORS.noDataError;
    log.error(e.message);
    return jsonError(res, RESPONSE_CODES.error, e);
  }

  return jsonSuccess(res, categoryModel, RESPONSE_CODES.success, SUCCESS.getSuccess);
});

export default CategoryController;
