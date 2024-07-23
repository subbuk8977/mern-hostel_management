import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Admin from './Components/Admin';
import Startpage from './Components/Startpage';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Account from './Components/Account';
import Selectedhotel from './Components/Selectedhotel';
import { Usercontext } from './Components/Usercontext';
import { useState } from 'react';
import Profile from './Components/Profile'
import Profileupdate from './Components/profileupdate';
import AdminPage from './Components/AdminPage';
import Booksucces from './Components/Booksucces';
import AdminviewBooking from './Components/AdminviewBooking';
import Adminviewuser from './Components/Adminviewuser';
import Adminviewhostel from './Components/Adminviewhostel';
function App() {
const [userid,setUserid]=useState("")
  return (
    <div className="App">
    <Usercontext.Provider value={{userid,setUserid}}>
      <Router>
        <Routes>
        <Route element={<Admin />}  path='/admin'></Route>
        <Route element={<AdminPage />} path="/adminpage"></Route>
        <Route element={<AdminviewBooking />} path="/adminviewbooking"></Route>
        <Route element={<Adminviewuser />} path="/adminviewuser"></Route>
        <Route element={<Adminviewhostel />} path="/adminviewhostel"></Route>
        <Route element={<Startpage />} path="/"></Route>
        <Route element={<Login />} path="/login"></Route>
        <Route element={<Signup />} path="/signup"></Route>
        <Route element={<Account />} path="/account"></Route>
        <Route element={<Selectedhotel />} path="/sh"></Route>
        <Route element={<Profile />} path="/profile"></Route>
        <Route element={<Profileupdate />} path="/profileupdate"></Route>
        <Route element={<Booksucces />} path="/booksuccess"></Route>
        </Routes>
      </Router>
      </Usercontext.Provider>
    </div>
  );
}

export default App;