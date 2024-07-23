import axios from 'axios'
import React, { useState } from 'react'
import "./Admin.css"
import { useNavigate } from 'react-router'
function Admin() {
  const [data,setdata]=useState({})
  const history=useNavigate()
  const handle=(event)=>{
    setdata({...data,[event.target.name]:event.target.value})
  }
  const submit=()=>{
    axios.post("http://localhost:8000/addhostel",{data}).then((responce)=>{
        alert("Hostel Data Submited")
        history("/adminpage")
    })
    console.log(data)
  }
  return (
    <div className='main'>
        <div className='adminwrap'>
        <h3>HOSTELS DATA</h3>
        <input type="text" placeholder="Hostel name" name="hostelname" onChange={handle}></input>
        <input type="text" placeholder="Hostel image" name="hostelimage" onChange={handle}></input>
        <input type="text" placeholder="HostelFoodimage and Room image" name="hostelmoreimage" onChange={handle}></input>
        <input type="text" placeholder="Hostel location" name="location" onChange={handle}></input>
        <input type="text" placeholder="Main Loction" name="mainlocation" onChange={handle}></input>
        <input type="Number" placeholder="Distance From Main Location" name="distancefrommailocation" onChange={handle}></input>
        <input type="number" placeholder="Cost per month" name="price" onChange={handle}></input>
        <input type="number" placeholder="No days of tenure" name="tenure" onChange={handle}></input>
        <input type="text" placeholder="hosteltype eg:Men or Women" name="hosteltype" onChange={handle}></input>
        <input type="number" placeholder="No of members in room" name="noofmembersinroom" onChange={handle}></input>
        <input type="text" placeholder="Description" name="description" onChange={handle}></input>
        <input type="text" placeholder="Ownername" name="ownername" onChange={handle}></input>
        <input type="number" placeholder="Contact no" name="contactno" onChange={handle}></input>
        <input type="text" placeholder="Amenities" name="amenities" onChange={handle}></input>
        <input type="text" placeholder="Services eg:washing Ironing etc" name="service" onChange={handle}></input>
        <input type="text" placeholder="Near By Places" name="nearbyplace" onChange={handle}></input>
        <input type="text" placeholder="Caterory eg:Single room or Combined room" name="category" onChange={handle}></input>
        <input type="number" placeholder="No of availablerooms" name="Availableroom" onChange={handle}></input>
        <input type="text" placeholder="AC/Non Ac" name="Ac" onChange={handle}></input>
        <input type="text" placeholder="Wifi availabilty" name="Wifi" onChange={handle}></input>
        <input type="number" placeholder="Latitude" name="lat" onChange={handle}></input>
        <input type="number" placeholder="Longitude" name="lng" onChange={handle}></input>
        {(data.customiseservice==="true") && <div className='divofoptioninput'>
          <input type="text" placeholder="Reduction price Without Food" name="nofood" onChange={handle}></input>
        <input type="number" placeholder="Reduction Price Without Ironing" name="noironing" onChange={handle}></input>
        <input type="number" placeholder="Reduction Price Without Washing" name="nowash" onChange={handle}></input>
        </div>}
        </div>
        <div className='radiodiv'><p>Customise Option</p>
        <div className='divofdiv'><input type="radio"  name="customiseservice" onChange={handle} value={true} className='radioinput'></input>
        <p>Yes</p></div>
        <div className='divofdiv'><input type="radio"  name="customiseservice" onChange={handle} value={false}></input>
        <p>No</p></div></div>
    <button onClick={submit}>SUBMIT</button>
    </div>
  )
}

export default Admin