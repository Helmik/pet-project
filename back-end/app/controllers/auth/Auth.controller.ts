import express, { Request, Response } from 'express';

import { ERRORS, SUCCESS } from '../../utils/serverMessages';
import { RESPONSE_CODES, LANGUAGES } from '../../../../common/utils/consts';
import RequestHandler from '../../../../common/utils/requestHandler';
import { jsonError, jsonSuccess } from '../../lib/Response';
import { bodyValidator } from '../../middlewares/request/RequestValidator';
import authMiddleware from '../../middlewares/auth/Auth.middleware';
import Log from '../../lib/Log';
import { sendRecoverPasswordEmail, login } from '../../services/auth/Auth.service';
import UserService from '../../services/user/User.service';

const AuthController =  express.Router();
const log = new Log('USER.CONTROLLER');
const userServiceInstance = UserService.getInstance();

AuthController.post('/password-recovery', bodyValidator(['email']), async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return jsonError(res, RESPONSE_CODES.error, ERRORS.userEmailRequired);
  }
  const { error, userModel } = await userServiceInstance.getByEmail(email);

  if (error || !userModel) {
    return jsonError(res, RESPONSE_CODES.error, error || ERRORS.noDataError);
  }

  const { lng } = req.headers;
  const language = lng || LANGUAGES.default;

  const resp = await sendRecoverPasswordEmail(language.toString(), userModel.toJSON());
  if (resp.error || !resp.string) {
    return jsonError(res, RESPONSE_CODES.error, resp.error || ERRORS.noDataError);
  }
  userModel.changePasswordToken = resp.string;
  // TODO: Handle error on save
  userModel.save();
  return jsonSuccess(res, resp.string, RESPONSE_CODES.success, SUCCESS.passwordRecoveryMailSent);
});

AuthController.post('/login', bodyValidator(['email', 'password']), async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { error, userModel } = await userServiceInstance.getByEmail(email);

  if (error || !userModel) {
    return jsonError(res, RESPONSE_CODES.error, error || ERRORS.noDataError);
  }

  const tokenResp = login(userModel.toJSON(), password);
  if (tokenResp.error || !tokenResp.string) {
    return jsonError(res, RESPONSE_CODES.unautorized, tokenResp.error || ERRORS.noDataError);
  }

  userModel.token =  tokenResp.string;
  const userUpdated = await RequestHandler(userServiceInstance.updateByInstance(userModel));

  if (userUpdated.error || !userUpdated.data) {
    log.error('Error on save token to user: ' + userUpdated.data.toJSON().email + '. ' + userUpdated.error);
    return jsonError(res, RESPONSE_CODES.error, ERRORS.userErrorOnSaveToken, userUpdated.error);
  }

  let userJson = userUpdated.data.user.toJSON();
  delete userJson.password;
  jsonSuccess(res, userJson, RESPONSE_CODES.success, SUCCESS.userLoggedIn);
});

AuthController.post('/logout', authMiddleware, bodyValidator(['user']), async (req: Request, res: Response) => {
  const { user } = req.body
  const { error, userModel } = await userServiceInstance.getById(user.id);

  if (error || !userModel) {
    log.error('Error on logout: ' + error?.message);
    return jsonError(res, RESPONSE_CODES.error, ERRORS.userErrorOnLogout, error);
  }

  userModel.token = String(Math.random() * 100000000);
  const userUpdated = await RequestHandler(userModel.save());

  if (userUpdated.error) {
    log.error('Error on logout: ' + userUpdated.error.message);
    return jsonError(res, RESPONSE_CODES.error, ERRORS.userErrorOnLogout, userUpdated.error);
  }
  return jsonSuccess(res, {}, RESPONSE_CODES.success, SUCCESS.userLoggedOut);
});


export default AuthController;
