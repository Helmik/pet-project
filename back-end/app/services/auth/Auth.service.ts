import dotenv from 'dotenv';

import EmailInterface from '../../interfaces/Email.interface';
import { language } from '../../interfaces/Email.interface';
import UserInterface from '../../../../common/interfaces/User.interface';
import RequestHandler from '../../../../common/utils/requestHandler';
import { ERRORS } from '../../utils/serverMessages';
import Log from '../../lib/Log';
import sendEmail from'../../lib/Mail';
import createTemplate from'../../email/index';
import { ResponseStringInterface } from '../../../../common/interfaces/Response.interface';

var jwt = require('jsonwebtoken');
const forge = require('node-forge');

forge.options.usePureJavaScript = true;
dotenv.config();
const log = new Log('AUTH.SERVICE');

export function sign(user: UserInterface, time?: number): string {
  let { email, id, firstName } = user;
  let now = +new Date();
  let payload: any = { email, id, firstName, iat: now };
  if (time) {
    payload.exp = now + time;
  }

  return jwt.sign(payload, process.env.SECRET_KEY, { algorithm: 'HS384' });
}

export async function verifyToken(token: string): Promise<ResponseStringInterface> {
  return new Promise(resolve => {
    try {
      var decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded.exp <= +new Date() + 1000000) {
        return resolve({ error: ERRORS.userErrorOnTryToGetToken });
      }
      return resolve({ string: decoded });
    } catch(err: any) {
      log.error(err.toString());
      return resolve({ error: ERRORS.userTokenDoesNotExist });
    }
  })
}


export async function decode(token: string): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET_KEY, function(err: any, decoded: string) {
      if (err) {
        reject(err)
      }
      resolve(decoded);
    });
  });
}

export function encrypt(password: string): string {
  let md = forge.md.sha384.create();
  md.update(password);
  return md.digest().toHex();
}

export function login(user: UserInterface, password: string): ResponseStringInterface {
  if (encrypt(password) !== user.password) {
    log.error('Invalid password: ' + user.password);
    return { error: ERRORS.userInvalidPassword };
  }

  let token = sign(user);

  return { string: token};
}

export async function sendRecoverPasswordEmail(lng: string, user: UserInterface): Promise<ResponseStringInterface> {
  let language: language = lng.indexOf('es') >= 0 ? 'es' : 'en';
  let subject = language === 'es' ? 'Solicitud de cambio de contraseña.' : 'Change password request.';
  let token = sign(user, 86400000);
  let emailConfig: EmailInterface = {
    data: {
      firstName: user.firstName,
      lastName: user.lastName !== null ? user.lastName : '',
      href: `${process.env.FORNTEND_BASE_URL}/change-password?token=${token}`
    },
    lng: language,
    template: 'recoverPassword'
  };
  let html = createTemplate(emailConfig);
  let { error } = await RequestHandler(sendEmail(user.email, subject, html));

  if (error) {
    return  { error };
  }
  return { string: token };
}
