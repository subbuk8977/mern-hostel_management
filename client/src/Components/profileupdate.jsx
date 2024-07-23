import React, { useState } from 'react'
import "./Profileupdate.css"
import { useLocation, useNavigate } from 'react-router'
import axios from 'axios'
function Profileupdate() {
  const profile=useLocation()
  const history=useNavigate()
  const [updateddata,setUpdateddata]=useState({})
  const [name,setName]=useState(profile.state.profile)
  const id=profile.state.profile._id
  const handle=(event)=>{
  setName({[event.target.name]:event.target.value})
  setUpdateddata({...updateddata,[event.target.name]:event.target.value})
  }
  const update=()=>{
    axios.post(`http://localhost:8000/update/${id}`,{updateddata}).then((responce)=>{
        if(responce!=="failed")
        history("/profile",{state:{profile:responce.data}})
    })
  }
  return (
    <div className='updatewrap'>
    <img src="https://img5.goodfon.com/wallpaper/nbig/6/58/gunten-switzerland-thunersee-lake-thun-bernese-alps-gunten-s.jpg" alt="i"></img>
        <div className='updatemain'>
            <h4>UPDATE ACCOUNT</h4>
            <input type="text" placeholder="Enter New name" value={name.username} name="username" onChange={handle}></input>
            <input type="text" placeholder="Enter New Email" value={name.email} name="email" onChange={handle}></input>
            <input type="number" placeholder="Enter New Mobile Number" value={name.contactno && name.contactno} name="contactno" onChange={handle}></input>
            <input type="number" placeholder="Enter Your Age" value={name.Age && name.Age} name="Age" onChange={handle}></input>
            <input type="text" name="Gender" placeholder='Male or Femail' value={name.Gender && name.Gender} onChange={handle}></input>
            <input type="text" placeholder="Enter New Address" value={name.Address} name="Address" onChange={handle}></input>
            <input type="text" placeholder="Enter Your Location" value={name.Place && name.Place} name="Place" onChange={handle}></input>
            <input type="text" placeholder="Student or Working" value={name.Status} name="Status" onChange={handle}></input>
            <input type="text" placeholder="Enter Your Collge or Company name" value={name.workplace && name.workplace} name="workplace" onChange={handle}></input>
            <button onClick={update}>UPDATE AND SUBMIT</button>
        </div>
    </div>
  )
}

export default Profileupdate