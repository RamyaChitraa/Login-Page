import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Landing from './Landing';
import PasswordConfirmation from './PasswordConfirmation';
import './index.css';
import { useState } from 'react';
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));

function App()
{

   const [users,setusers] = useState(

    [
        {
            username:"Ramya",
            password:"1234"
        },

        {
            username:"chitra",
            password:"4321"
        }
    ]
   )

   function check(){
     const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
     var logindetails = axios.get(`${apiUrl}/login`)
   }

   return( 
   <div>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Login users={users} setusers={setusers}/>}></Route>
    <Route path='/Signup' element={<Signup users={users} setusers={setusers}/>}></Route>
    <Route path='/Landing' element={<Landing/>}></Route>
    <Route path='/PasswordConfirmation' element={<PasswordConfirmation users={users} setusers={setusers}/>}></Route>
    </Routes>
    </BrowserRouter>
   </div>)
}


root.render(
  <App/>
);

