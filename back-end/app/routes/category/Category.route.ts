import { Express } from 'express';

import CategoryController from '../../controllers/category/Category.controller';

const categoryRoutes = (server: Express) => {
  server.use('/category', CategoryController);
}

export default categoryRoutes;
