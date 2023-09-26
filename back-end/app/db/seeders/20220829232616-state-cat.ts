'use strict';
import { Op, QueryInterface } from 'sequelize';
import { MX_ALLOWED } from '../../../../common/utils/consts';

module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: any) {
    return await queryInterface.bulkInsert('mx_state_cat', [
      { id: 1, name: 'Aguascalientes', isActive: false, createdAt: new Date(), updatedAt: new Date, countryId: MX_ALLOWED.id },
      { id: 2, name: 'Baja California', isActive: false, createdAt: new Date(), updatedAt: new Date, countryId: MX_ALLOWED.id },
      { id: 3, name: 'Baja California Sur', isActive: false, createdAt: new Date(), updatedAt: new Date, countryId: MX_ALLOWED.id },
      { id: 4, name: 'Campeche', isActive: false, createdAt: new Date(), updatedAt: new Date, countryId: MX_ALLOWED.id },
      { id: 5, name: 'Chiapas', isActive: false, createdAt: new Date(), updatedAt: new Date, countryId: MX_ALLOWED.id },
      { id: 6, name: 'Chihuahua', isActive: false, createdAt: new Date(), updatedAt: new Date, countryId: MX_ALLOWED.id },
      { id: 7, name: 'Coahuila', isActive: false, createdAt: new Date(), updatedAt: new Date, countryId: MX_ALLOWED.id },
      { id: 8, name: 'Colima', isActive: false, createdAt: new Date(), updatedAt: new Date, countryId: MX_ALLOWED.id },
      { id: 9, name: 'Ciudad de México', isActive: false, createdAt: new Date(), updatedAt: new Date, countryId: MX_ALLOWED.id },
      { id: 10, name: 'Durango', isActive: false, createdAt: new Date(), updatedAt: new Date, countryId: MX_ALLOWED.id },
      { id: 11, name: 'Estado de México', isActive: false, createdAt: new Date(), updatedAt: new Date, countryId: MX_ALLOWED.id },
      { id: 12, name: 'Guanajuato', isActive: false, createdAt: new Date(), updatedAt: new Date, countryId: MX_ALLOWED.id },
      { id: 13, name: 'Guerrero', isActive: false, createdAt: new Date(), updatedAt: new Date, countryId: MX_ALLOWED.id },
      { id: 14, name: 'Hidalgo', isActive: false, createdAt: new Date(), updatedAt: new Date, countryId: MX_ALLOWED.id },
      { id: 15, name: 'Jalisco', isActive: false, createdAt: new Date(), updatedAt: new Date, countryId: MX_ALLOWED.id },
      { id: 16, name: 'Michoacán', isActive: false, createdAt: new Date(), updatedAt: new Date, countryId: MX_ALLOWED.id },
      { id: 17, name: 'Morelos', isActive: false, createdAt: new Date(), updatedAt: new Date, countryId: MX_ALLOWED.id },
      { id: 18, name: 'Nayarit', isActive: false, createdAt: new Date(), updatedAt: new Date, countryId: MX_ALLOWED.id },
      { id: 19, name: 'Nuevo León', isActive: false, createdAt: new Date(), updatedAt: new Date, countryId: MX_ALLOWED.id },
      { id: 20, name: 'Oaxaca', isActive: false, createdAt: new Date(), updatedAt: new Date, countryId: MX_ALLOWED.id },
      { id: 21, name: 'Puebla', isActive: false, createdAt: new Date(), updatedAt: new Date, countryId: MX_ALLOWED.id },
      { id: 22, name: 'Querétaro', isActive: false, createdAt: new Date(), updatedAt: new Date, countryId: MX_ALLOWED.id },
      { id: 23, name: 'Quintana Roo', isActive: true, createdAt: new Date(), updatedAt: new Date, countryId: MX_ALLOWED.id },
      { id: 24, name: 'San Luis Potosí', isActive: false, createdAt: new Date(), updatedAt: new Date, countryId: MX_ALLOWED.id },
      { id: 25, name: 'Sinaloa', isActive: false, createdAt: new Date(), updatedAt: new Date, countryId: MX_ALLOWED.id },
      { id: 26, name: 'Sonora', isActive: false, createdAt: new Date(), updatedAt: new Date, countryId: MX_ALLOWED.id },
      { id: 27, name: 'Tabasco', isActive: false, createdAt: new Date(), updatedAt: new Date, countryId: MX_ALLOWED.id },
      { id: 28, name: 'Tamaulipas', isActive: false, createdAt: new Date(), updatedAt: new Date, countryId: MX_ALLOWED.id },
      { id: 29, name: 'Tlaxcala', isActive: false, createdAt: new Date(), updatedAt: new Date, countryId: MX_ALLOWED.id },
      { id: 30, name: 'Veracruz', isActive: false, createdAt: new Date(), updatedAt: new Date, countryId: MX_ALLOWED.id },
      { id: 31, name: 'Yucatán', isActive: false, createdAt: new Date(), updatedAt: new Date, countryId: MX_ALLOWED.id },
      { id: 32, name: 'Zacatecas', isActive: false, createdAt: new Date(), updatedAt: new Date, countryId: MX_ALLOWED.id }
    ]);
  },

  async down (queryInterface: QueryInterface, Sequelize: any) {
    return await queryInterface.bulkDelete('mx_state_cat', { id: { [Op.gt]: 0 } });
  }
};
