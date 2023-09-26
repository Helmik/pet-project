import { Table, Model, Column, DataType, PrimaryKey, UpdatedAt, CreatedAt, AutoIncrement, Unique, HasMany } from 'sequelize-typescript';
import MxStateCatModel from './MxStateCat.model';


@Table({
  tableName: 'country_cat'
})
export default class CountryCatModel extends Model<CountryCatModel> {
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
  en: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  es: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  iso2: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  iso3: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  currencyCode: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phoneCode: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
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

  @HasMany(() => MxStateCatModel, { sourceKey: 'id' })
  states: MxStateCatModel[];
}
