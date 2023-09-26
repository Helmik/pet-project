import EmailInterface from '../interfaces/Email.interface';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT;
const url = process.env.URL;
const protocol = process.env.PROTOCOL;
const baseUrl = `${protocol}://${url}:${port}`;

export default function createTemplate (input: EmailInterface) {

  input.data = input.data || {};
  input.data.baseUrl = baseUrl;

  // We use js extention because the code will take compiled files (js files)
  let templateGenerator = require(`./templates/${input.lng}/${input.template}`);
  let template = templateGenerator(input.data);
  let contactUs = input.lng === 'es' ? 'Contactanos' : 'Contact us'

  return `
    <body style="margin: 0;height: 100vh;">
    <header style="background-color: #121212; color: #fff;display: flex;">
      <h1 style="height: 64px; display: flex;align-items: center;margin: auto;">Project</h1>
    </header>

    <div>
      ${template}
    </div>
  
    <footer style="background-color: rgb(0, 30, 60);bottom: 0;position: fixed;width: 100%;color: white;">
      <div style="display: flex;align-items: center;padding: 0.5em 10%;justify-content: center;">
        <span>${contactUs}:</span>
        <a href="https://www.facebook.com" target="_blank" style="cursor: pointer;">
          <img src="${baseUrl}/public/icons/facebook_gs.svg" alt="Facebook" style="width: 24px;height: 24px;filter: invert(1); margin-left: 0.5em;">
        </a>
        <a href="https://www.instagram.com/" target="_blank" style="cursor: pointer;">
          <img src="${baseUrl}/public/icons/instagram_gs.svg" alt="Instagram" style="width: 24px;height: 24px;filter: invert(1); margin-left: 0.5em;">
        </a>
        <a href="mailto:test.mx@gmail.com" target="_blank" style="cursor: pointer;">
          <img src="${baseUrl}/public/icons/mail_gs.svg" alt="Mail" style="width: 24px;height: 24px;filter: invert(1); margin-left: 0.5em;">
        </a>
      </div>
    </footer>
  `;
}
