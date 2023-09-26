import { Table, Model, Column, DataType, PrimaryKey, UpdatedAt, CreatedAt, AutoIncrement, ForeignKey, Unique } from 'sequelize-typescript';
import { Optional } from 'sequelize/types';

import UserInterface from '../../../../common/interfaces/User.interface';
import { encrypt } from '../../services/auth/Auth.service';
import UserRoleCatModel from './UserRoleCat.model';

type UserInterfaceOptional = Optional<UserInterface, 'lastName' | 'password' | 'phone' | 'phoneUrl' | 'birthday'| 'isActive'| 'createdAt'| 'updatedAt'| 'iat'| 'token'| 'changePasswordToken'>;
@Table({
  tableName: 'user'
})
export default class UserModel extends Model<UserInterface, UserInterfaceOptional> {
  @PrimaryKey
  @AutoIncrement
  @Unique 
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  firstName!: string;

  @Column({
    type: DataType.STRING
  })
  lastName!: string;

  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    set(pwd: string) {
      this.setDataValue('password', encrypt(pwd));
    }
  })
  password!: string;
  
  @Column({
    type: DataType.STRING
  })
  phone!: string;
  
  @Column({
    type: DataType.STRING
  })
  phoneUrl!: string;
  
  @Column({
    type: DataType.DATEONLY
  })
  birthday!: Date;
  
  @Column({
    type: DataType.STRING
  })
  token!: string;

  @Column({
    type: DataType.STRING
  })
  changePasswordToken!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    set(isActive) {
      this.setDataValue('isActive', isActive);
    }
  })
  isActive!: boolean;
  
  @CreatedAt
  @Column({
    allowNull: false,
    type: DataType.DATE,
    set(date) {
      let d = date || date !== null ? date : new Date();
      this.setDataValue('createdAt', d);
    }
  })
  createdAt!: Date;

  @UpdatedAt
  @Column({
    allowNull: false,
    type: DataType.DATE,
    set(date) {
      let d = date || date !== null ? date : new Date();
      this.setDataValue('updatedAt', d);
    }
  })
  updatedAt!: Date;

  @ForeignKey(() => UserRoleCatModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'user_role_cat',
      key: 'id'
    },
    set(userRoleId) {
      let ur = userRoleId ? userRoleId : 4;
      this.setDataValue('userRoleId', ur);
    }
  })
  userRoleId!: UserRoleCatModel;
}
