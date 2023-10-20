import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import UserList from './components/userList/UserList'
import UserEdit from './components/AddUser/UserEdit'
import axios from 'axios';

axios.defaults.baseURL ="http://localhost:5000"


function App() {
 

  return (
    <div className="App">
      <Routes>
      <Route path="/" element = {<UserList/>}/>
      <Route path = "/edit/:id" element = {<UserEdit/>} />
      </Routes>
       
    </div>
  )
}

export default App
