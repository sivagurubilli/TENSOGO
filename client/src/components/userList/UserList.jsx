import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./userList.css"

const UserList=() =>{
  const [users, setUsers] = useState([]);
const navigate = useNavigate()


  useEffect(() => {
    // Make an API request to get the list of users
    axios.get('/users').then((response) => {
       
      setUsers(response.data);
    });
  }, []);

  const GotoEdit = (id)=>{

    navigate(`edit/${id}`)
  }

  return (
    <div className='container1'>
      <h2>User List</h2>
      <div className='container'>
        {users.map((user) => (

          <div className='card' key={user.id}>
           

           <h3> name - {user.name} </h3>
            
           <h3>  {user.email}</h3>
           <h3>gender -  {user.gender}</h3>

           
            <button className='button' onClick={()=>GotoEdit(user.id)}>Edit</button>
          </div>

        ))}
      </div>
    </div>
  );
}

export default UserList;
