import express, { Express } from 'express';
const bodyParser = require('body-parser');

import userRoutes from './user/user.route';
import authRoutes from './auth/Auth.route';
import categoryRoutes from './category/Category.route'
import geographyRoutes from './geography/Geography.route';
import addressRoutes from './address/Address.route';

export const router: any = {};

export const initRouter = (server: Express) => {

  // Middlewares
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(express.json());


  userRoutes(server);
  authRoutes(server);
  categoryRoutes(server);
  geographyRoutes(server);
  addressRoutes(server);

  // TODO: verify if thise values are needed
  router['user'] = userRoutes;
  router['auth'] = authRoutes;
}
