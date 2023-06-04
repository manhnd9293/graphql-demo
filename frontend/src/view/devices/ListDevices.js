import React from 'react';
import {gql, useQuery} from "@apollo/client";
import {Link} from "react-router-dom";

const GET_DEVICES = gql`
    query getDevices {
        devices {
            _id
            name
        }
    }
`;

function ListDevices() {
  const {loading, error, data} = useQuery(GET_DEVICES);
  if(loading) return <p>Loading ... </p>
  if(error) return <p>Error: {error.message}</p>

  return (
    <div>
      <h4>List devices</h4>
      <Link to={'/create'}>Create</Link>
      <div style={{marginTop: 10}}>
        <table>
          <tr>
            <th>ID</th>
            <th>Device name</th>
          </tr>
          {data.devices.map(({_id, name}) => {
            return (
              <tr key={_id}>
                <td>{_id}</td>
                <td>{name}</td>

              </tr>
            )
          })}
        </table>
      </div>
    </div>
  );
}

export default ListDevices;