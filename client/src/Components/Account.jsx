import React, { useState } from 'react'
import {CiLogout} from "react-icons/ci"
import {FaRegUser,FaUserEdit} from "react-icons/fa"
import {BsPersonWorkspace} from "react-icons/bs"
import {GiBlackBook} from "react-icons/gi"
import { Outlet, useLocation, useNavigate } from 'react-router'
import "./Account.css"
import "./Displayhostel"
import Displayhostel from './Displayhostel'
import Searchbar from './Searchbar'
import logo from "./Images/22.jpg"
import Accountloader from './Accountloader'
import axios from 'axios'
function Account() {
  const userdata=useLocation()
  const history=useNavigate()
  const [location,setLocation]=useState("")
  const [bookdata,setBookdata]=useState()
  const [profileenable,setProfileenable]=useState(false)
  const [sortenable,setSortenable]=useState(false)
  const [enableviewbook,setEnableviewbook]=useState(false)
  const profile=()=>{
    if(profileenable===false)
    setProfileenable(true)
    else
    setProfileenable(false)
  }
  const enablefuction=()=>{
    setEnableviewbook(true)
    axios.get(`http://localhost:8000/getbooking/${userdata.state.data._id}`).then((responce)=>{
      console.log(responce)
      setBookdata(responce.data)
    })
  }
  return (
    <div className='blackbody'>
      <div className='accountnavbar'>
        <img src={logo} alt="logo" className='accountnavbarimage'></img>
        <div className='navright'>
        <p>{userdata.state.data.isadmin ?"Hello Admin,":"Hello"} {userdata.state.data.username}</p>
        <img src="https://cdn-icons-png.flaticon.com/128/10813/10813409.png" className='accountlogo' onClick={profile} alt="profileimage"></img>
        </div>
      </div>
      {location ? <Displayhostel location={location} userid={userdata.state} setSortenable={setSortenable} sortenable={sortenable}/> :<Accountloader />}
      <Searchbar setLocation={setLocation} setSortenable={setSortenable} />
     <div className={profileenable ?'profilediv':'profileoff'}>
      <div className='innerprofilediv' onClick={()=>history("/profile" ,{state:{profile:userdata.state.data}})}>
        <FaRegUser />
        <p>Your Profile</p>
      </div>
      <div className='innerprofilediv' onClick={()=>history("/profileupdate" ,{state:{profile:userdata.state.data}})}>
        <FaUserEdit />
        <p>Edit Profile</p>
      </div>
      <div className='innerprofilediv' onClick={enablefuction}>
        <GiBlackBook />
        <p>Your Bookings</p>
      </div>
      <div className='innerprofilediv' onClick={()=>history("/")}>
        <CiLogout />
        <p>Logout</p>
      </div>
      {userdata.state.data.isadmin && <div className='innerprofilediv' onClick={()=>history("/adminpage",{state:{data:userdata.state.data}})}>
        <BsPersonWorkspace/>
        <p>Admin Panel</p>
      </div>  }
      </div>
      <Outlet/>
      {enableviewbook && <div className='profileenablewrapdiv'>
      <img src="https://cdn-icons-png.flaticon.com/128/2763/2763138.png" alt="imagesdf" className='closeofprofile'onClick={()=>setEnableviewbook(false)}></img>
      {(bookdata && bookdata.length>0) ? bookdata.map((item,key)=>{
        return(<div key={key}>
        <img src={item.Bookedhostelid.hostelimage} alt="imgaess" className='bookimage'></img>
        <h3 className='bookimageh3'>{item.Bookedhostelid.hostelname}</h3>
        <div className='bookimagediv'>
          <p>Price:{item.Bookedhostelid.price} Rs/Month</p>
          <p>Location:{item.Bookedhostelid.mainlocation}</p>
        </div>
        <p className='pbid'>Booking id:{item.Bookedhostelid._id}</p>
        </div>)
      }):<p className='bookdef'>You Currently Didnt have any Bookings</p>}
      </div>}
    </div>
  )
}

export default Account