import { Table, Model, Column, DataType, PrimaryKey, UpdatedAt, CreatedAt, AutoIncrement, Unique, HasMany } from 'sequelize-typescript';
import UserModel from './User.model';

@Table({
  tableName: 'user_role_cat'
})
export default class UserRoleCatModel extends Model<UserRoleCatModel> {
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
  name!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false
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

  @HasMany(() => UserModel, { sourceKey: 'id' })
  user: UserModel[];
}
