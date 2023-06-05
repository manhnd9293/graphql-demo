const {SubDeviceModel} = require("./SubDeviceModel");

class SubDeviceService {
  async getSubDevice({parentId}) {
    const subDevices = await SubDeviceModel.find({
      parentId
    }).lean();

    return subDevices;
  }

  async createSubDevice({parentId, subDevices}){
    await SubDeviceModel.insertMany(
      subDevices.map(subDevice => ({
        parentId,
        name: subDevice
      }))
    );

    return SubDeviceModel.find({
      parentId
    }).lean();
  }
}

module.exports = {SubDeviceService: new SubDeviceService()}