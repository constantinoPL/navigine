import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../infrastructure/orm';
import { DeviceAttributes, DeviceCreationAttributes } from './device.types';

export class Device extends Model<DeviceAttributes, DeviceCreationAttributes> implements DeviceAttributes {
  public id!: number;
  public mac!: string;
  public deviceType!: string;
  public userId!: number;

  public createdAt!: Date;
}

Device.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    mac: {
      type: DataTypes.STRING(17),
      allowNull: false,
      unique: true,
      validate: {
        len: [17, 17],
      },
    },
    deviceType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 100],
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'devices',
    sequelize, // passing the `sequelize` instance is required},
  },
);
