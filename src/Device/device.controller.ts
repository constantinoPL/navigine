import { NextFunction } from 'express';
import { Request, Response } from 'express-serve-static-core';
import { httpStatusCodes } from '../infrastructure/common/http.status-codes';
import { ApiError } from '../infrastructure/Exceptions/api.errors';
import { Device } from './device.entity';
import { deviceService } from './device.service';
import { DeviceCreationAttributes } from './device.types';

class DeviceController {
  async createDevice(
    req: Request<{ body: { device: DeviceCreationAttributes; userEmail: string } }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { userId, mac, deviceType } = req.body.device;
      deviceService.validateDeviceFields(mac, deviceType);
      const createdDevice = await deviceService.create({ userId, mac, deviceType });

      return res.json(createdDevice);
    } catch (err) {
      next(err);
    }
  }

  async getDeviceById(req: Request, res: Response, next: NextFunction) {
    try {
      const device = await Device.findOne({ where: { id: req.params.id } });
      if (device) {
        res.json(device);
      } else {
        throw ApiError.NotFound(`device with ID: ${req.params.id} does not exist`);
      }
    } catch (err) {
      next(err);
    }
  }

  async deleteDeviceById(req: Request, res: Response, next: NextFunction) {
    try {
      const device = await Device.findOne({ where: { id: req.params.id } });
      if (device) {
        await device.destroy();
        res.sendStatus(httpStatusCodes.NO_CONTENT);
      } else {
        throw ApiError.NotFound(`device with ID: ${req.params.id} does not exist`);
      }
    } catch (err) {
      next(err);
    }
  }
}

export const deviceConrtoller = new DeviceController();
