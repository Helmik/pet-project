import { Express } from 'express';
import UserController from '../../controllers/user/User.controller';

const userRoutes = (server: Express) => {
  server.use('/users', UserController);
}

export default userRoutes;
