import { Table, Model, Column, DataType, PrimaryKey, UpdatedAt, CreatedAt, AutoIncrement, BelongsToMany, Unique } from 'sequelize-typescript';

@Table({
  tableName: 'category_cat'
})
export default class CategoryCatModel extends Model<CategoryCatModel> {
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
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  es!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  en!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  descriptionEs!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  descriptionEn!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  images!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  url: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false
  })
  isActive!: boolean;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  createdAt!: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  updatedAt!: Date; 
}
