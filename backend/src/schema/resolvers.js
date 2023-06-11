
const DeviceService = require('../services/device/DeviceService');
const {SubDeviceService} = require("../services/subDevices/SubDeviceService");
const resolvers = {
  Query: {
    async devices(parent, args, context){
      context.deviceSerialNo = 'dev-1';
      return await DeviceService.getDevices();
    },

    async device(parent, args, context) {
      context.deviceSerialNo = 'dev-1';
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
      let newSubDevices = [];
      if(subDevices) {
        newSubDevices = await SubDeviceService.createSubDevice({
          parentId: parentDevice._id,
          subDevices
        })

      }

      return {...parentDevice, subDevices: newSubDevices}
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
  },

  SubDevice: {
    serialNumber: async (parent, args, context) => {
      const deviceSerialNo = context.deviceSerialNo;
      const subNo = 'sub-1234';
      return `${deviceSerialNo}-${subNo}`;
    }
  }
}

module.exports = {resolvers};
