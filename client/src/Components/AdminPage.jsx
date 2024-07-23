import React from 'react'
import "./AdminPage.css"
import { useLocation, useNavigate } from 'react-router'
import axios from 'axios'
function AdminPage() {
  const history=useNavigate()
  const user=useLocation()
  const bookfunction=()=>{
    axios.get("http://localhost:8000/allbooking").then((responce)=>{
      history("/adminviewbooking",{state:{data:responce.data}})
    })
  }
  const viewfunction=()=>{
    axios.get("http://localhost:8000/alluser").then((responce)=>{
      history("/adminviewuser",{state:{data:responce.data}})
    }) 
  }
  const viewhostel=()=>{
    axios.get("http://localhost:8000/fetchhotel").then((responce)=>{
      history("/adminviewhostel",{state:{data:responce.data}})
    }) 
  }
  return (
    <div className='adminpagemaindiv'>
    <button onClick={()=>history("/account",{state:{data:user.state.data}})} className='backbuttoninadminpage'>Back To Home</button>
    <div className='wrapadmin'>
    <h2 className='adminh1'>Admin Page</h2>
    <div className='flexofadmin'>
    <div onClick={()=>history("/admin")} className='adminbutton'>Add Hostel</div>
    <div onClick={bookfunction} className='adminbutton'>View Bookings</div>
    <div onClick={viewfunction} className='adminbutton'>View User</div>
    <div onClick={viewhostel} className='adminbutton'>View Hostel</div>
    </div>
    </div>
    </div>
  )
}

export default AdminPage