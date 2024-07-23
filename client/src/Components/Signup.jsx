import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
function Signup() {
    const history=useNavigate()
    const [data,setData]=useState({})
    const handle=(event)=>{
      setData({...data,[event.target.name]:event.target.value})
    }
    const passdata=()=>{
      axios.post("http://localhost:8000/signup",{data}).then((responce)=>{
        if(responce.data.username)
        {
          alert("Please Login using your created fields")
          history("/login")
        }
        else
        alert("This Email has Already Registered with another user......")
      })
    }
  return (
    <div className='loginbody'>
      <div className='logindiv'>
        <img src="https://images.unsplash.com/photo-1617098900591-3f90928e8c54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGJlZCUyMHJvb218ZW58MHx8MHx8&w=1000&q=80" alt="loginimage" className='loginimages'></img>
        <div className='inputdiv'>
        <h2 style={{textAlign:"center"}}>Welcome To Pocket PG</h2>
        <p style={{textAlign:"center"}}>Welcome to Pocket PG.Explore the new ways to find a Hostel of your perfect choice.Come and Just Explore </p>
        <h4 style={{textAlign:"center"}}>SignUp to Pocket PG</h4>
        <input type="text" placeholder="Enter Your Name" name="username" onChange={handle}></input>
        <input type="text" placeholder="Enter Your Email" name="email" onChange={handle}></input>
        <input type="password" placeholder="Enter Your Password" name="password" onChange={handle}></input>
        <button onClick={passdata}>Signup</button>
        <label>Already have account</label>
        <label className='labelforsignin' onClick={()=>history("/login")}>Login</label>
        </div>
        </div>
    </div>
  )
}

export default Signup