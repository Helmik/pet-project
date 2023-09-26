import { Express } from 'express';

import AuthController from '../../controllers/auth/Auth.controller';

const authRoutes = (server: Express) => {
  server.use('/auth', AuthController);
}

export default authRoutes;
