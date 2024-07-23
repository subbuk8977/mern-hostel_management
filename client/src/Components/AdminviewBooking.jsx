import React from 'react'
import "./AdminviewBooking.css"
import { useLocation } from 'react-router'
function AdminviewBooking() {
 const books=useLocation()
 console.log(books.state.data)
  return (
    <div className='mainwrapofbooking'>
        <div className='viewmainwrap'>
          <h3 className='h3ofviewbok'>Total Bookings....</h3>
          {books.state.data.map((item,key)=>{
          return(
          <div className='divofeachmainbook'>
            <div className='booksof'>
            <p>Booking Id:{item._id}</p>
            <p>User Id:{item.Bookeduserid}</p>
            </div>
            <div className='booksofof'>
            <p>Hostel Name:{item.Bookedhostelid.hostelname}</p>
            <p>Hostel Location:{item.Bookedhostelid.mainlocation}</p>
            <p>Hostel Booking Price:{item.Bookingprice}</p>
            <p>Customise Service:{item.customise?"Yes":"No"}</p>
            <p>Date of Booking:{item.createdAt}</p>
            </div>
          </div>
          )
          })} 
        </div>
    </div>
  )
}

export default AdminviewBooking