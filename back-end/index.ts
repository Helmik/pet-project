import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import Log from './app/lib/Log';
import { initRouter } from './app/routes/index';
import Database from './app/db/index';
import RequestHandler from '../common/utils/requestHandler';
import setCors from './app/utils/cors';

dotenv.config();
const server: Express = express();
const port = process.env.PORT;
const log = new Log('INDEX');

async function init () {
  const { error } = await RequestHandler(Database.authenticate());
  // const { error } = await RequestHandler(Database.sync({ force: false, alter: true }));
  
  if (error) {
    return log.error('Troubles on database connection: ' + error.toString());
  }
  
  initRouter(server);
  setCors(server);
  
  // Declare public folder
  server.use('/public', express.static('./app/public'));
  
  server.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
  });
  server.listen(port, () => {
    log.success(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
}

init();
