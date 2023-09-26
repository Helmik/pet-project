'use strict';
import { QueryInterface } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface, DataTypes: any) {
    await queryInterface.createTable('mx_municipality_cat', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lat: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      lng: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      geoPoint: {
        type: DataTypes.GEOMETRY('POINT', 4326),
        allowNull: true
      },
      inegiCode: {
        type: DataTypes.STRING,
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
      },
      mxStateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'mx_state_cat',
          key: 'id'
        }
      }
    });
  },
  async down(queryInterface: QueryInterface, DataTypes: any) {
    await queryInterface.dropTable('mx_municipality_cat');
  }
};
