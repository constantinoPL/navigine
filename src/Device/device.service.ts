import { ApiError } from '../infrastructure/Exceptions/api.errors';
import { Device } from './device.entity';
import { DeviceCreationAttributes } from './device.types';

class DeviceService {
  static existingDeviceTypes: Record<string, string> = {
    BLE: 'ble',
    WIFI: 'wifi',
    LOCATOR: 'locator',
    WIFI_RTT: 'wifi_rtt',
  };

  validateDeviceFields(mac: string, deviceType: string) {
    if (!DeviceService.existingDeviceTypes[deviceType.toUpperCase()]) {
      throw ApiError.BadRequest(`this type: ${deviceType} does not exist`);
    }
    if (
      !mac.match(
        /^[a-z0-9]{2}[\.\-:][a-z0-9]{2}[\.\-:][a-z0-9]{2}[\.\-:][a-z0-9]{2}[\.\-:][a-z0-9]{2}[\.\-:][a-z0-9]{2}$/i,
      )
    ) {
      throw ApiError.BadRequest('Invalid mac');
    }
  }

  async create(device: DeviceCreationAttributes): Promise<Device> {
    const { userId, mac, deviceType } = device;

    const existingDevice = await Device.findOne({ where: { mac } });

    if (existingDevice) {
      throw ApiError.BadRequest(`A device with this mac: ${mac}, already exists`);
    }

    const createdDevice = await Device.create({ userId, mac, deviceType, createdAt: new Date() });

    return createdDevice;
  }
}

export const deviceService = new DeviceService();
