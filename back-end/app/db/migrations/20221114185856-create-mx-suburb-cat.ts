'use strict';
import { QueryInterface } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface, DataTypes: any) {
    await queryInterface.createTable('mx_suburb_cat', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      zipCode: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lat: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      lng: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      geoPoint: {
        type: DataTypes.GEOMETRY('POINT', 4326),
        allowNull: false
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      mxMunicipalityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'mx_municipality_cat',
          key: 'id'
        }
      }
    });
  },
  async down(queryInterface: QueryInterface, DataTypes: any) {
    await queryInterface.dropTable('mx_suburb_cat');
  }
};
