import React from 'react'
import  "./Booksucces.css"
import { useLocation, useNavigate } from 'react-router'
function Booksucces() {
 const data=useLocation()
 const history=useNavigate()
 console.log(data)
 const Gotoaccountfuction=()=>{
    history("/account",{state:{data:data.state.data.user}})
 }
  return (
    <div>
        <div className='booksuccessdiv'>
         <img src="https://cdn-icons-png.flaticon.com/128/875/875541.png" alt="imagesty"></img>
         <h2>Hey {data.state.data.user.username}</h2>
         <h3>You have Successfully Booked the {data.state.data.hostel.hostelname} Hostel</h3>
         <p className='tahnkyoup'>Thank You</p>
         <button onClick={Gotoaccountfuction}>Go to Home Page</button>
         <p className='pofbook'>Your Booking Id is below:</p>
         <p className='pofbook'>{data.state.data.user._id}</p>
        </div>
    </div>
  )
}

export default Booksucces