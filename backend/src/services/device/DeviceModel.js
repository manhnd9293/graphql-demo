const {Schema, model} = require("mongoose");

const DeviceSchema = new Schema({
  name: {type: String, required: true}
})

const DeviceModel = model('Device', DeviceSchema);

module.exports = {DeviceModel};
