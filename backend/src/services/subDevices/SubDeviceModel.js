const { Schema, model,  } = require("mongoose");

const SubDeviceSchema = new Schema({
  name: {type: String, required: true},
  parentId: {type: Schema.Types.ObjectId, ref: 'Device'}
})

const SubDeviceModel = model('SubDevice', SubDeviceSchema);

module.exports = {SubDeviceModel};
