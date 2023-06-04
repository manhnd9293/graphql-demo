import React from 'react';
import DeviceForm from "./DeviceForm";
import {Link, useNavigate} from "react-router-dom";
import {gql, useMutation} from "@apollo/client";

const blankDevice = {
  name: '',
  _id: ''
}

const CREATE_DEVICE_MUTATION = gql`
  mutation CreateDevice($newDeviceData: CreatDeviceInput!) {
      createDevice(newDeviceData: $newDeviceData){
          _id,
          name
      }
  }
`;

function CreateDevice() {
  const [createDeviceFnc, {data, loading, error}] = useMutation(CREATE_DEVICE_MUTATION);
  const navigate = useNavigate()

  async function createDevice({name, _id}) {
    console.log({name, _id});
    await createDeviceFnc({
      variables: {
        newDeviceData: {name}
      }
    })

    navigate('/')
  }
  return (
    <div>
      <h3>New device</h3>
      <Link to={'/'}>Back</Link>
      <DeviceForm device={blankDevice}
                  onSubmit={createDevice}
      />
    </div>
  );
}

export default CreateDevice;