const {DeviceModel} = require("./DeviceModel");
const {Error} = require("mongoose");

class DeviceService {
  async getDevices() {
    const devices = await DeviceModel.find({}).lean();
    return devices;
  }

  async getDeviceDetail({_id}) {
    const device = await DeviceModel.findOne({
      _id,
    }).lean();

    if (!device) {
      throw new Error(`device not found`);
    }

    return device;
  }

  async createDevice({name}) {
    const newDevice = await DeviceModel.create({
      name
    });

    return newDevice;
  }

  async updateDevice({name, _id}) {
    if (!name || name.length === 0) {
      throw Error('Name is required');
    }

    const updateDevice = await DeviceModel.findOne({
      _id
    });

    if (!updateDevice) {
      throw Error("Device not found");
    }

    await DeviceModel.updateOne({
      _id
    }, {
      $set: {
        name
      }
    });

    const updated = await DeviceModel.findOne({
      _id
    });

    return updated;
  }

  async deleteDevices(ids) {
    await DeviceModel.deleteMany({
      _id: {$in: ids}
    });
  }
}

module.exports = new DeviceService();