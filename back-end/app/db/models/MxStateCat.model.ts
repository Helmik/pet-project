import { Table, Model, Column, DataType, PrimaryKey, UpdatedAt, CreatedAt, AutoIncrement, Unique, ForeignKey, HasMany } from 'sequelize-typescript';
import CountryCatModel from './CountryCat.model';
import MxMunicipalityCatModel from './MxMunicipalityCat.model';


@Table({
  tableName: 'mx_state_cat'
})
export default class MxStateCatModel extends Model<MxStateCatModel> {
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
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
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

  @HasMany(() => MxMunicipalityCatModel, { sourceKey: 'id' })
  municipalities: MxMunicipalityCatModel[];
}
