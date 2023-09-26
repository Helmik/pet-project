import express, { Request, Response } from 'express';

import { ERRORS, SUCCESS } from '../../utils/serverMessages';
import { RESPONSE_CODES } from '../../../../common/utils/consts';
import RequestHandler from '../../../../common/utils/requestHandler';
import { bodyValidator } from '../../middlewares/request/RequestValidator';
import { jsonError, jsonSuccess } from '../../lib/Response';
import Log from '../../lib/Log';
import { verifyToken } from '../../services/auth/Auth.service';
import UserService from '../../services/user/User.service';

const UserController =  express.Router();
const log = new Log('USER.CONTROLLER');

UserController.post('/signup', bodyValidator(['firstName', 'email', 'password']), async (req: Request, res: Response) => {
  try {
    const userServiceInstance = UserService.getInstance();
    const { error, user } = userServiceInstance.createFromObject(req.body);

    if (error || !user) {
      return jsonError(res, RESPONSE_CODES.error, error || ERRORS.noDataError);
    }

    const newUser = await userServiceInstance.signUp(user);
    
    if (newUser.error || !newUser.user) {
      return jsonError(res, RESPONSE_CODES.conflict, newUser.error || ERRORS.noDataError);
    }
    
    delete newUser.user.password;
    return jsonSuccess(res, newUser.user, RESPONSE_CODES.success, SUCCESS.userCreation);
  } catch(error: any) {
    log.error(ERRORS.userCreation + error);
    return jsonError(res, RESPONSE_CODES.error, ERRORS.userCreation, error);
  }
});

UserController.post('/change-password', bodyValidator(['token', 'password']), async(req: Request, res: Response) => {
  const { token, password } = req.body

  const userServiceInstance = await UserService.getInstance();
  const tokenVerified = await verifyToken(token);

  if (tokenVerified.error) {
    return jsonError(res, RESPONSE_CODES.error, tokenVerified.error);
  }
  
  const { error, userModel } = await userServiceInstance.getByChangePasswordToken(token);
  if (error || !userModel) {
    return jsonError(res, RESPONSE_CODES.error, error || ERRORS.noDataError);
  }
  
  userModel.password = password;
  userModel.changePasswordToken = String(Math.random() * 100000000);
  userModel.updatedAt = new Date();
  const newUser = await RequestHandler(userModel.save());
  
  if (newUser.error || !newUser.data) {
    return jsonError(res, RESPONSE_CODES.error, newUser.error || ERRORS.noDataError);
  }

  let userJson = newUser;
  if (newUser.data) {
    let userJson = newUser.data.toJSON();
    delete userJson.password;
    delete userJson.changePasswordToken;
  }
  return jsonSuccess(res, { user: userJson }, RESPONSE_CODES.success, SUCCESS.userChangePassword);
});

export default UserController;
