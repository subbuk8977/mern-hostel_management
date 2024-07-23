import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { Usercontext } from './Usercontext'
import "./Login.css"
function Login() {
    const history=useNavigate()
    const [data,setData]=useState({})
    const {setUserid}=useContext(Usercontext)
    const handle=(event)=>{
    setData({...data,[event.target.name]:event.target.value})
    }
    const passdata=async()=>{
            axios.post("http://localhost:8000/login",{data}).then((responce)=>{
            if(responce.data==="IP"||responce.data==="IU")
            alert("Inavlid Username or Password")
            else
            {
            setUserid(responce.data.username)
            history("/account",{state:{data:responce.data}})
            }
    })
    }
  return (
    <div className='loginbody'>
      <div className='logindiv'>
        <img src="https://kitchendesignpartner.com/wp-content/uploads/2019/09/The-ideal-kitchen-is-the-social-hub-where-everyone-gathers.jpg" alt="loginimage" className='loginimage'></img>
        <div className='inputdiv'>
        <h2 style={{textAlign:"center"}}>Hey Welcome Again</h2>
        <p style={{textAlign:"center"}}>Welcome to Pocket PG.Explore the new ways to find a Hostel of your perfect choice.Come and Just Explore</p>
        <h4 style={{textAlign:"center"}}>Login Now</h4>
        <input type="text" placeholder="Enter Your Email" name="email" onChange={handle}></input>
        <input type="password" placeholder="Enter Your Password" name="password" onChange={handle}></input>
        <button onClick={passdata}>Login</button>
        <label>New To Hosteler</label>
        <label className='labelforsignin' onClick={()=>history("/signup")}>Signup</label>
        </div>
        </div>
        </div>
  )
}

export default Login