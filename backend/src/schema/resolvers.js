
const DeviceService = require('../services/device/DeviceService');
const {SubDeviceService} = require("../services/subDevices/SubDeviceService");
const resolvers = {
  Query: {
    async devices(){
      return await DeviceService.getDevices();
    },

    async device(parent, args) {
      const {_id} = args;
      const deviceDetail = await DeviceService.getDeviceDetail({_id});
      deviceDetail.licenseList = ['x', 'y'];
      return deviceDetail;
    }
  },

  Mutation: {
    async createDevice(parent, args) {
      const {newDeviceData: {name, subDevices}} = args;
      const parentDevice = await DeviceService.createDevice({name});
      const newSubDevices = await SubDeviceService.createSubDevice({
        parentId: parentDevice._id,
        subDevices
      })

      return {...parentDevice, subDevices}
    },

    async updateDevice(parent, args) {
      const {updateDeviceData: {name, _id}} = args;
      return await DeviceService.updateDevice({name, _id});
    },

    async deleteDevices(parent, args) {
      try {
        const {deviceIds} = args;
        await DeviceService.deleteDevices(deviceIds);
        return true;
      } catch (e) {
        return false;
      }
    },
  },

  Device: {
    async licenseList(parent, args) {
      return ['1', '2', '3']
    },

    async subDevices(parent, args) {
      const {_id} = parent;
      const subDevices = await SubDeviceService.getSubDevice({parentId: _id});

      return subDevices;
    }
  }
}

module.exports = {resolvers};
