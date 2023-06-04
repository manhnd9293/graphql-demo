import React from 'react';
import DeviceForm from "./DeviceForm";
import {gql, useMutation, useQuery} from "@apollo/client";
import {useNavigate, useParams} from "react-router-dom";

const GET_DEVICE_DETAIL = gql`
  query DeviceDetail($id: String!) {
    device(_id: $id) {
        _id
        name
    }
  }
`

const UPDATE_DEVICE_MUTATION = gql`
    mutation UpdateDevice($updateDeviceData: UpdateDeviceInput!) {
        updateDevice(updateDeviceData: $updateDeviceData) {
            name
            _id
        }
    }
`

function EditDevice() {
  const {deviceId} = useParams();
  const {loading, error, data} = useQuery(GET_DEVICE_DETAIL, {
    variables: {
      id: deviceId
    }
  });
  const navigate = useNavigate()


  const [updateDeviceFnc,
    {data: updateData, loading: loadingUpdate, error: errorUpdate}] = useMutation(UPDATE_DEVICE_MUTATION);

  async function updateDevice({name, _id}) {
    await updateDeviceFnc({
      variables: {
        updateDeviceData: {
          _id,
          name
        }
      }
    });

    navigate('/');
  }

  if(loading) return <p>Loading ... </p>
  if(error) return <p>Error: {error.message}</p>

  return (
    <div>
      <h4>Edit device</h4>
      <DeviceForm device={data.device}
                  onSubmit={updateDevice}
      />
    </div>
  );
}

export default EditDevice;