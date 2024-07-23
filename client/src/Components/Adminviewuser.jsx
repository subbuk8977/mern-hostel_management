import React from 'react'
import "./Adminviewuser.css"
import { useLocation } from 'react-router'
function Adminviewuser() {
  const user=useLocation()
  return (
    <div>
       <div className='mainwrapofbooking'>
        <div className='viewmainwrap'>
          <h3 className='h3ofviewbok'>All Users....</h3>
          {user.state.data.map((item,key)=>{
          return(
          <div className='divofeachmainbook'>
            <div className='booksof'>
            <p>User Id:{item._id}</p>
            </div>
            <div className='booksofof'>
            <p>User Name:{item.username}</p>
            <p>User Email:{item.email}</p>
            </div>
          </div>
          )
          })} 
        </div>
    </div> 
    </div>
  )
}

export default Adminviewuser