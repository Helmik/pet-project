'use strict';
import { QueryInterface } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface, DataTypes: any) {
    await queryInterface.createTable('address', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true
      },
      street: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      streetNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apartmentNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      details: {
        type: DataTypes.TEXT,
        allowNull: true,
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
      countryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'country_cat',
          key: 'id'
        }
      },
      mxStateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'mx_state_cat',
          key: 'id'
        }
      },
      mxMunicipalityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'mx_municipality_cat',
          key: 'id'
        }
      },
      mxLocalityId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'mx_locality_cat',
          key: 'id'
        }
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        }
      }
    });
  },
  async down(queryInterface: QueryInterface, DataTypes: any) {
    await queryInterface.dropTable('address');
  }
};
