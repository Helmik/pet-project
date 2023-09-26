import dotenv from 'dotenv';

import RequestHandler from '../../../common/utils/requestHandler';
import Log from '../lib/Log';
import { ResponseInterface } from '../../../common/interfaces/Response.interface';

const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

dotenv.config();

const email = process.env.EMAIL_EMAIL;
const password = process.env.EMAIL_PASSWORD;
const log = new Log('MAIL');

const transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: password,
    },
}));


export default async function sendEmail(to: string, subject: string, html: string): Promise<ResponseInterface> {
  let { error, data} = await RequestHandler(transporter.sendMail({ from: email, to, subject, html }));
  
  if (error){
    log.error('Error on send email: ' + error.message);
    return { error };
  }
  return { data };
}

