import { Table, Model, Column, DataType, PrimaryKey, UpdatedAt, CreatedAt, AutoIncrement, Unique, ForeignKey } from 'sequelize-typescript';
import { Optional } from 'sequelize/types';

import CountryCatModel from './CountryCat.model';
import MxStateCatModel from './MxMunicipalityCat.model';
import MxMunicipalityCatModel from './MxStateCat.model';
import MxLocalityCatModel from './MxLocalityCat.model';
import UserModel from './User.model';
import AddressInterface from '../../../../common/interfaces/Address.interface';


type AddressInterfaceOptional = Optional<AddressInterface, 'apartmentNumber' | 'details' | 'geoPoint' | 'mxLocalityId'>;

@Table({
  tableName: 'address'
})
export default class AddressModel extends Model<AddressModel, AddressInterfaceOptional> {

  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
    unique: true
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  street: String;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  streetNumber: String;
  
  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  apartmentNumber: String;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  details: String;

  @Column({
    type: DataType.FLOAT,
    allowNull: false
  })
  lat: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false
  })
  lng: number;

  @Column({
    type: DataType.GEOMETRY('POINT', 4326),
    allowNull: false
  })
  geoPoint: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    set(isActive) {
      this.setDataValue('isActive', isActive);
    }
  })
  isActive: boolean;

  @CreatedAt
  @Column({
    allowNull: false,
    type: DataType.DATE,
    set(date) {
      let d = date || date !== null ? date : new Date();
      this.setDataValue('createdAt', d);
    }
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    allowNull: false,
    type: DataType.DATE,
    set(date) {
      let d = date || date !== null ? date : new Date();
      this.setDataValue('updatedAt', d);
    }
  })
  updatedAt: Date;


  @ForeignKey(() => CountryCatModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'country_cat',
      key: 'id'
    }
  })
  countryId: number;

  @ForeignKey(() => MxStateCatModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'mx_state_cat',
      key: 'id'
    }
  })
  mxStateId: number;

  @ForeignKey(() => MxMunicipalityCatModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'mx_municipality_cat',
      key: 'id'
    }
  })
  mxMunicipalityId: number;

  @ForeignKey(() => MxLocalityCatModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    references: {
      model: 'mx_municipality_cat',
      key: 'id'
    }
  })
  mxLocalityId: number;

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id'
    }
  })
  userId: number;
}
