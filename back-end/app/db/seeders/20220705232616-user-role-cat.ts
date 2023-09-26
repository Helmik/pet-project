'use strict';
import { Op, QueryInterface } from 'sequelize';

module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: any) {
    return await queryInterface.bulkInsert('user_role_cat', [
    {
      id: 1,
      name: 'websiteMaster',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      name: 'admin',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      name: 'businesOwner',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 4,
      name: 'normalUser',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface: QueryInterface, Sequelize: any) {
    return await queryInterface.bulkDelete('user_role_cat', { id: { [Op.gt]: 0 } });
  }
};
