import React, { useEffect, useState } from 'react'
import "./Profile.css"
import { useLocation, useNavigate } from 'react-router'
import axios from 'axios'
function Profile() {
  const profile=useLocation()
  const history=useNavigate()
  const [selection,setSelecton]=useState(1)
  const [profileilmgenable,setProfileimageenable]=useState(false)
  const [data,setData]=useState({})
  const [userimage,setUserimage]=useState()
  const [loading,setLoaging]=useState(false)
  let base64String
  const imagepopup=(value)=>{
    setProfileimageenable(value)
  }
  const imagesave= async(e)=>{
    const image=e.target.files[0]
    const base64= await uploadimage(image)
    setData({datas:base64})
  }
  const uploadimage=(file)=>{
  return new Promise((res,rej)=>{
    const filereader=new FileReader()
    filereader.readAsDataURL(file)
    filereader.onload=()=>{
      res(filereader.result)
    }
    filereader.onerror=(error)=>{
      rej(error)
    }
  }) 
  }
  const upload=()=>{
    setLoaging(true)
    axios.post(`http://localhost:8000/uploadimage/${profile.state.profile._id}`,{data}).then((responce)=>{
      imagepopup(false)
      setLoaging(false)
      alert("Image Updated Succesfully")
      displayimagefunction()
    })
  }
  const fetchimage=()=>{
    imagepopup(false)
  }
  useEffect(()=>{
    displayimagefunction()
  })
  const displayimagefunction=()=>{
      axios.get(`http://localhost:8000/getimage/${profile.state.profile._id}`).then((responce)=>{
      base64String=responce.data.image
      base64String && setUserimage(base64String)
    })
  }
  return (
    <div>
    <img className='profilebackimg' src="https://img.jamesedition.com/listing_images/2023/02/21/12/32/36/0236076f-4269-443b-acdb-2b82c87730de/je/1000x620xc.jpg" alt="images"></img>
    <div className='profiledetaildiv'>
    <div className='profileimagediv'>
        { <img src={userimage && userimage} alt=""/>}
        <button className='detailbutton addimagebutton' onClick={()=>imagepopup(true)}>Add photo</button>
        <h3>Hey, {profile.state.profile.username}</h3>
    </div>
    <div className='profilecontent'>
        <h3>YOUR ACCOUNT</h3>
        <div className='profileselectiondiv'>
        <p className={selection===1 ?'selection':"notselection"} onClick={()=>setSelecton(1)}>Account Info</p>
        <p className={selection===2 ?'selection':"notselection"} onClick={()=>setSelecton(2)}>Additional Info</p>
        </div>
        {selection===1 ? 
        <div className='profiledatawrapdiv'>
        <div className='profiledatadiv'>
        <p>Name :</p>
        <p className='profiledatadivdata'>{profile.state.profile.username}</p>
        </div>
        <div className='profiledatadiv'>
        <p>Linked Email
        :</p>
        <p className='profiledatadivdata'>{profile.state.profile.email}</p>
        </div>
        <button onClick={()=>history("/profileupdate",{state:{profile:profile.state.profile}})}>Edit Profile</button>
        <button onClick={()=>history("/account",{state:{data:profile.state.profile}})}>Cancel</button>
        </div>:!profile.state.profile.contactno ? <p className='profiledatadivdata profiledatadiv'>You didn't have Added Additional User details </p>:<div className='profiledatawrapdiv'>
        <div className='profiledatadiv'>
        <p>Contact No :</p>
        <p className='profiledatadivdata'>{profile.state.profile.contactno}</p>
        </div>
        <div className='profiledatadiv'>
        <p>Address :</p>
        <p className='profiledatadivdata'>{profile.state.profile.Address}</p>
        </div>
        <div className='profiledatadiv'>
        <p>Age :</p>
        <p className='profiledatadivdata'>{profile.state.profile.Age}</p>
        </div>
        <div className='profiledatadiv'>
        <p>Gender :</p>
        <p className='profiledatadivdata'>{profile.state.profile.Gender}</p>
        </div>
        <div className='profiledatadiv'>
        <p>Your Stand :</p>
        <p className='profiledatadivdata'>{profile.state.profile.Status}</p>
        </div>
        <div className='profiledatadiv'>
        <p>Location :</p>
        <p className='profiledatadivdata'>{profile.state.profile.Place}</p>
        </div>
        <div className='profiledatadiv'>
        <p>Company or College Name :</p>
        <p className='profiledatadivdata'>{profile.state.profile.workplace}</p>
        </div>
        <button className='detailbutton' onClick={()=>history("/profileupdate",{state:{profile:profile.state.profile}})}>Edit Profile</button>
        <button className='detailbutton' onClick={()=>history("/account",{state:{data:profile.state.profile}})}>Cancel</button>
        </div>}
    </div>
    </div>
    {profileilmgenable && <div className='profileupdatediv'>
      <input type="file" onChange={imagesave}></input>
      {loading && <p style={{fontFamily:"arapey"}}>Loading.....</p>}
      <div> <button className='detailsbutton' onClick={fetchimage}>Close</button><button className='detailsbutton' onClick={upload}>Upload</button></div>
    </div>}
    </div>
  )
}

export default Profile