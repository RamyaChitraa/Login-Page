import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Landing from './Landing';
import PasswordConfirmation from './PasswordConfirmation';
import './index.css';
import { useState } from 'react';

function App() {
  const [users, setUsers] = useState([
    { username: "Ramya", password: "1234" },
    { username: "chitra", password: "4321" }
  ]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login users={users} setusers={setUsers} />} />
          <Route path='/Signup' element={<Signup users={users} setusers={setUsers} />} />
          <Route path='/Landing' element={<Landing />} />
          <Route path='/PasswordConfirmation' element={<PasswordConfirmation users={users} setusers={setUsers} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
