import { Optional } from 'sequelize';

export interface DeviceAttributes {
  id: number;
  mac: string;
  deviceType: string;
  userId: number;

  createdAt: Date;
}

export interface DeviceCreationAttributes extends Optional<DeviceAttributes, 'id' | 'createdAt'> {}
