import React from 'react'
import "./Adminviewhostel.css"
import { useLocation } from 'react-router'
function Adminviewhostel() {
    const hostel=useLocation()
  return (
    <div>
        <div>
       <div className='mainwrapofbooking'>
        <div className='viewmainwrap'>
          <h3 className='h3ofviewbok'>All Users....</h3>
          {hostel.state.data.map((item,key)=>{
          return(
          <div className='divofeachmainbook'>
            <div className='booksof'>
            <p>Hostel Id:{item._id}</p>
            </div>
            <div className='booksofof'>
            <p>Hostel Name:{item.hostelname}</p>
            <p>Hostel Location:{item.location}</p>
            </div>
          </div>
          )
          })} 
        </div>
    </div> 
    </div>
    </div>
  )
}

export default Adminviewhostel