'use strict';
import { QueryInterface } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface, DataTypes: any) {
    await queryInterface.createTable('country_cat', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true
      },
      en: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      es: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      iso2: {
        type: DataTypes.STRING(2),
        allowNull: false,
      },
      iso3: {
        type: DataTypes.STRING(3),
        allowNull: false,
      },
      currencyCode: {
        type: DataTypes.STRING(3),
        allowNull: false
      },
      phoneCode: {
        type: DataTypes.STRING(7),
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface: QueryInterface, DataTypes: any) {
    await queryInterface.dropTable('country_cat');
  }
};
