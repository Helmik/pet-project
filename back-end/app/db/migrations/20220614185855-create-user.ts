'use strict';
import { QueryInterface } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface, DataTypes: any) {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING
      },
      phoneUrl: {
        type: DataTypes.STRING
      },
      birthday: {
        type: DataTypes.DATEONLY
      },
      token: {
        type: DataTypes.STRING,
      },
      changePasswordToken: {
        type: DataTypes.STRING,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      userRoleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user_role_cat',
          key: 'id'
        }
      }
    });
  },
  async down(queryInterface: QueryInterface, DataTypes: any) {
    await queryInterface.dropTable('user');
  }
};
