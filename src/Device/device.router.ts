import express from 'express';
import { Router } from 'express-serve-static-core';
import { deviceConrtoller } from './device.controller';

export const deviceRouter: Router = express.Router();

deviceRouter.get('/:id', deviceConrtoller.getDeviceById);

deviceRouter.post('/', deviceConrtoller.createDevice);

deviceRouter.delete('/:id', deviceConrtoller.deleteDeviceById);
