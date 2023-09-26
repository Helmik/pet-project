import { AxiosInstance } from 'axios';

import UserInterface from '../../../common/interfaces/User.interface';
import { ResponseInterface, ResponseStringInterface, ResponseUserInterface } from '../../../common/interfaces/Response.interface';
import RequestHandler from '../../../common/utils/requestHandler';

class UsersApi {
  private static instance: UsersApi;
  axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  static getInstance(axios: AxiosInstance): UsersApi{
    if (!UsersApi.instance) {
      UsersApi.instance = new UsersApi(axios);
    }

    return UsersApi.instance;
  }

  // Return an array with an error in the position '0' or an user in the position '1'.
  async signup(user: UserInterface): Promise<ResponseUserInterface> {
    const { error, data, success } = await RequestHandler(this.axios.post('/users/signup', user));
    return { error, user: data, success };
  }

  async passwordRecovery(email: string): Promise<ResponseStringInterface> {
    const { error, data, success } = await RequestHandler(this.axios.post(`/auth/password-recovery`, { email }));
    return { error, string: data, success };
  }

  async changePassword(password: string, token: string): Promise<ResponseUserInterface> {
    const { error, data, success } = await RequestHandler(this.axios.post('/users/change-password', { password, token }));
    return { error, user: data, success };
  }

  async login(email: string, password: string): Promise<ResponseUserInterface> {
    const { error, data, success } = await RequestHandler(this.axios.post('/auth/login', { email, password }));
    return { error, user: data, success };
  }

  async logout(user: UserInterface): Promise<ResponseInterface> {
    return await RequestHandler(this.axios.post('/auth/logout', { user }));
  }
}

export default UsersApi;
