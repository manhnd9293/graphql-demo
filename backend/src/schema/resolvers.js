
const DeviceService = require('../services/device/DeviceService');
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
      const {newDeviceData: {name}} = args;
      return await DeviceService.createDevice({name});
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
    }
  }
}

module.exports = {resolvers};
