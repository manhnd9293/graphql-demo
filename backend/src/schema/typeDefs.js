const {gql} = require("apollo-server");

const typeDefs = gql`
    type Query{
        devices: [Device!]!
        device(_id: String!): Device
    }

    type Mutation {
        createDevice(newDeviceData: CreatDeviceInput!): Device
        updateDevice(updateDeviceData: UpdateDeviceInput!): Device
        deleteDevices(deviceIds: [ID!]): Boolean
    }


    type Device {
        _id: ID!,
        name: String!
        licenseList: [String]
        subDevices: [SubDevice]
    }
    
    type SubDevice {
        _id: ID!,
        name: String!,
        serialNumber: String,
    }
    
    input CreatDeviceInput {
        name: String!
        subDevices: [String]
    }
    
    input UpdateDeviceInput {
        name: String!
        _id: ID!
    }
`

module.exports = {typeDefs}
