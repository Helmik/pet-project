import { Express } from 'express';
import GeographyMxController from '../../controllers/geography/GeographyMx.controller';
import GeographyController from '../../controllers/geography/Geography.controller';

const geographyRoutes = (server: Express) => {
  server.use('/geography/mx', GeographyMxController);
  server.use('/geography', GeographyController);
}

export default geographyRoutes;
