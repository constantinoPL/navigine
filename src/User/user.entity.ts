import { Model, DataTypes } from 'sequelize';
import { Device } from '../Device/device.entity';
import { UserAttributes, UserCreationAttributes } from './user.types';
import { sequelize } from '../infrastructure/orm';

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public name!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [2, 100],
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 100],
      },
    },
  },
  {
    tableName: 'users',
    sequelize, // passing the `sequelize` instance is required},
  },
);

User.hasMany(Device, {
  sourceKey: 'id',
  foreignKey: 'userId',
  as: 'devices', // this determines the name in `associations`!
});
