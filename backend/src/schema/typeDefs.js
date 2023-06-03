const {gql} = require("apollo-server");

const typeDefs = gql`
    type Device {
        _id: ID!,
        name: String!
    }
    
    type Query{
        devices: [Device!]!
    }
    
    input CreatDeviceInput {
        name: String!
    }
    
    input UpdateDeviceInput {
        name: String!
        _id: ID!
    }
    
    type Mutation {
        createDevice(newDeviceData: CreatDeviceInput): Device
        updateDevice(updateDeviceData: UpdateDeviceInput): Device
        deleteDevices(deviceIds: [ID!]): Boolean
    }
`

module.exports = {typeDefs}
