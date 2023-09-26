'use strict';
import { Op, QueryInterface } from 'sequelize';

module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: any) {
    return await queryInterface.bulkInsert('user', [
      { id: 1, firstName: 'Helmik', lastName: 'Escamilla', email: 'test@mailinator.com', password: '0b2a93b2bbe54d75e6f0b6928cc13eb198fe8b02ed8a2dff296800e3ac82957d6d544b325c716164b4b1e558492621a6', isActive: true, createdAt: new Date(), updatedAt: new Date(), userRoleId: 4 }
    ]);
  },

  async down (queryInterface: QueryInterface, Sequelize: any) {
    return await queryInterface.bulkDelete('user', { id: { [Op.gt]: 0 } });
  }
};
