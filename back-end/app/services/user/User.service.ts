import UserInterface from '../../../../common/interfaces/User.interface';
import { ResponseUserInterface } from '../../../../common/interfaces/Response.interface'
import { ResponseUserModelInterface } from '../../interfaces/ServerResponse.interface';
import { ERRORS } from '../../utils/serverMessages';
import { USER_ROLES } from '../../../../common/utils/consts';
import RequestHandler from '../../../../common/utils/requestHandler';
import Log from '../../lib/Log';
import { isEmailValid, isPasswordValid } from '../../../../common/utils/validations'
import UserModel from '../../db/models/User.model';

const log = new Log('USER.SERVICE');
export default class UserService {
  private static _userServiceInstance: UserService;

  constructor() { }

  static getInstance(): UserService {
    if (!UserService._userServiceInstance) {
      UserService._userServiceInstance = new UserService();
    }

    return UserService._userServiceInstance;
  }

  async signUp(user: UserInterface): Promise<ResponseUserInterface> {
    // Create User
    const resp = await this.getByEmail(user.email);
    let errorToSend = resp.error;
    // If email is nor registered, email can create a new register
    if (!resp.userModel) {
      const { error, data } = await RequestHandler(UserModel.create(user));
      errorToSend = error;
      if (data) {
        return { user: data.toJSON() };
      }
    } else {
      return { error: ERRORS.userEmailAlreadyUsed };
    }

    //TODO: Handle error
    return { error: errorToSend };
  }

  async updateByInstance(user: UserModel): Promise<ResponseUserInterface> {
    const { error, data} = await RequestHandler(user.save());

    // TODO: Handle error
    return { user: data, error };
  }

  async updateToken(userId: number, token: string): Promise<ResponseUserInterface> {
    const { error, data } = await RequestHandler(UserModel.update({ token }, {
      where: {
        id: userId
      }
    }));

    // TODO: Handle error
    return { user: data };
  }

  async getById(id: number): Promise<ResponseUserModelInterface> {
    let { error, data } =  await RequestHandler(UserModel.findByPk(id));
    // TODO: Handle error
    return { error, userModel: data }
  }

  async getByEmail(email: string): Promise<ResponseUserModelInterface> {
    let resp = await RequestHandler(UserModel.findOne({ where: { email } }));
    
    if (resp.error) {
      log.error('Error on try to get user by email: ' + resp.error);
      return { error: ERRORS.userNotFoundByEmail }
    }

    return { userModel: resp.data };
  }

  async getByChangePasswordToken(token: string): Promise<ResponseUserModelInterface> {
    let { error, data } = await RequestHandler(UserModel.findOne({ where: { changePasswordToken: token } }));
    
    if (error) {
      log.error('Error on try to get user by token: ' + error);
      return { error: ERRORS.userErrorOnTryToGetToken };
    }

    if (data === null) {
      log.error(`Token ${token} does not exist.`);
      return { error: ERRORS.userTokenDoesNotExist };
    }
    return { userModel: data };
  }

  createFromObject(obj: any): ResponseUserInterface {
    const { 
      id,
      firstName,
      lastName,
      email,
      password,
      phone,
      phoneUrl,
      birthday,
      isActive,
      createdAt,
      updatedAt,
      userRoleId,
      changePasswordToken
    } = obj;

    if (typeof firstName !== 'string' || firstName.length === 0) {
      log.error(ERRORS.userFirstNameRequired.message);
      return { error: ERRORS.userFirstNameRequired };
    }
    if (typeof email !== 'string' || email.length === 0) {
      log.error(ERRORS.userEmailRequired.message);
      return { error: ERRORS.userEmailRequired };
    }
    if (typeof password !== 'string' || password.length === 0) {
      log.error(ERRORS.userPasswordRequired.message);
      return { error: ERRORS.userPasswordRequired };
    }

    if (!isEmailValid(email)) {
      log.error(ERRORS.userInvalidEmail.message + email);
      return { error: ERRORS.userInvalidEmail };
    }
    if (!isPasswordValid(password)) {
      log.error(ERRORS.userInvalidFormatPassword.message + password);
      return { error: ERRORS.userInvalidFormatPassword };
    }

    let newUserRoleId = !userRoleId ? USER_ROLES.normalUser : userRoleId;

    let user: UserInterface = { firstName, email, password, userRoleId: newUserRoleId };
    
    if (id !== undefined) { user.id = id; }
    if (lastName !== undefined) { user.lastName = lastName; }
    if (phone !== undefined) { user.phone = phone; }
    if (phoneUrl !== undefined) { user.phoneUrl = phoneUrl; }
    if (birthday !== undefined) { user.birthday = birthday; }
    if (createdAt !== undefined) { user.createdAt = createdAt; }
    if (updatedAt !== undefined) { user.updatedAt = updatedAt; }
    if (isActive !== undefined) { user.isActive = isActive; }
    if (changePasswordToken !== undefined) { user.changePasswordToken = changePasswordToken }

    log.success('Create user model successfully.');
    return { user };
  }

}
