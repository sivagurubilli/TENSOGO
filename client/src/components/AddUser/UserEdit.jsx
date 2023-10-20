import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./Useredit.css"

const UserEdit =()=> {
  const [user, setUser] = useState({
    name: '',
    email: '',
    gender: '',
    status: '',
  });
  const { id } = useParams();

  useEffect(() => {
    async function fetchUser() {
      const response = await axios.get(`/getUsers/${id}`);
      setUser(response.data);
    }

    fetchUser();
  }, [id]);

  const handleUpdate = () => {
    axios
      .post('/updateUser', {
        id: match.params.id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        status: user.status,
      })
      .then((response) => {
        // Handle success or error
      });
  };

  return (
    <div   >
      <h1 className='h1'>Edit User</h1>
      <br/>
      <div className='cont1'>
      <form>
        <div className='cont2'>
          <label>Name:</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
        <div className='cont2'>
          <label>Email:</label>
          <input
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className='cont2'>
          <label>Gender:</label>
          <input
            type="text"
            value={user.gender}
            onChange={(e) => setUser({ ...user, gender: e.target.value })}
          />
        </div>
        <div className='cont2'>
          <label>Status:</label>
          <input
            type="text"
            value={user.status}
            onChange={(e) => setUser({ ...user, status: e.target.value })}
          />
        </div>
        <button className='update' onClick={handleUpdate}>Update</button>
      </form>
      </div>
    </div>
  );
}

export default UserEdit;
