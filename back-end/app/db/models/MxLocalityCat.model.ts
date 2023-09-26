import { Table, Model, Column, DataType, PrimaryKey, UpdatedAt, CreatedAt, AutoIncrement, Unique, ForeignKey } from 'sequelize-typescript';
import MxMunicipalityCatModel from './MxMunicipalityCat.model';


@Table({
  tableName: 'mx_locality_cat'
})
export default class MxLocalityCatModel extends Model<MxLocalityCatModel> {
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
  name: string;

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
    allowNull: false
  })
  isActive: boolean;

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
}
