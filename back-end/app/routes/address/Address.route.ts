import { Express } from 'express';

import AddressController from '../../controllers/address/Address.controller';

const addressRoutes = (server: Express) => {
  server.use('/address', AddressController);
}

export default addressRoutes;
