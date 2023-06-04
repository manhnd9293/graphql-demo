import React, {useState} from 'react';

function DeviceForm({device, onSubmit}) {
  let [name, setName] = useState(device.name);
  return (
    <div style={{marginTop: 10}}>
      <div>
        <div>Name</div>
        <div>
          <input type={'text'}
                 value={name}
                 onChange={e => setName(e.target.value)}
          />
        </div>
      </div>
      <div style={{marginTop: 10}}>
        <button disabled={name.length === 0}
                onClick={() => onSubmit({name, _id: device._id})}
        >Submit</button>
      </div>
    </div>
  );
}

export default DeviceForm;