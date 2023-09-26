import { Table, Model, Column, DataType, PrimaryKey, UpdatedAt, CreatedAt, AutoIncrement, Unique, HasMany, ForeignKey } from 'sequelize-typescript';

import MxStateCatModel from './MxStateCat.model';
import MxLocalityCatModel from './MxLocalityCat.model';


@Table({
  tableName: 'mx_municipality_cat'
})
export default class MxMunicipalityCatModel extends Model<MxMunicipalityCatModel> {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: true
  })
  lat: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: true
  })
  lng: number;

  @Column({
    type: DataType.GEOMETRY('POINT', 4326),
    allowNull: true
  })
  geoPoint: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  inegiCode: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isActive: string;

  @CreatedAt
  @Column({
    allowNull: false,
    type: DataType.DATE
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    allowNull: false,
    type: DataType.DATE
  })
  updatedAt: Date;

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

  @HasMany(() => MxLocalityCatModel, { sourceKey: 'id' })
  localities: MxLocalityCatModel[];
}
