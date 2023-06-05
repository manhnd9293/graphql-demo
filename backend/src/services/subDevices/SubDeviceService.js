const {SubDeviceModel} = require("./SubDeviceModel");

class SubDeviceService {
  async getSubDevice({parentId}) {
    const subDevices = await SubDeviceModel.find({
      parentId
    }).lean();

    return subDevices;
  }

  async createSubDevice({parentId, subDevices}){
    await SubDeviceModel.bulkWrite
  }
}

module.exports = {SubDeviceService: new SubDeviceService()}