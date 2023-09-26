
import { Request, Response, NextFunction } from 'express';

import { jsonError } from '../../lib/Response';
import { RESPONSE_CODES } from '../../../../common/utils/consts';
import { ERRORS } from '../../utils/serverMessages';
import UserService from '../../services/user/User.service';

const userServiceInstance = UserService.getInstance();

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = (req.headers.authorization && req.headers.authorization.match(/^Bearer (.*)$/) || []).pop();
  const id = Number(req.headers.uid);

  if (typeof token === 'string' && token.length > 0 && id !== undefined && !isNaN(id) && token !== undefined) {
    const { userModel } = await userServiceInstance.getById(id);
  
    if (userModel && userModel.toJSON().token === token) {
      req.body = req.body || {};
      req.body.user = userModel.toJSON();
      return next();
    }
  }

  return jsonError(res, RESPONSE_CODES.unautorized, ERRORS.userUnautorized);
}
