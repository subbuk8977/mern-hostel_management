import React from 'react'
import logo from "./Images/22.jpg"
import { useNavigate } from 'react-router'
import "./Startpage.css"
function Startpage() {
    const history=useNavigate()
  return (
    <div>
        <img className='startimg' src="https://www.hotelscombined.com/himg/da/c2/4f/agoda-435270-113568793-201815.jpg" alt="startimage"></img>
        <div className='navbar'>
         <img className='logo' src={logo} alt="logo"></img>
         <div className='logodiv'>
         <p className='signupologinptag'>Signup/Login</p>
         <img src="https://cdn-icons-png.flaticon.com/128/9706/9706647.png" alt="login" className='startlogos' onClick={()=>history("/signup")}></img>
         <img src="https://cdn-icons-png.flaticon.com/128/9797/9797203.png" alt="signup" className='startlogoss' onClick={()=>history("/login")}></img>
         </div>
        </div>
        <p className='startcontent'>FEEL LIKE HOME</p>
        <div className='startpagecontent'>
          <h3>Premium Accommodation</h3>
          <p>Lets Find Out a Better Place with full of Customer satisfaction.
          Come To Us and Have a Experience with Us with Good Memories</p>
        </div>
    </div>
  )
}

export default Startpage

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaUserCircle, FaSignInAlt } from 'react-icons/fa';
// import logo from "./Images/22.jpg";
// import "./Startpage.css";

// function Startpage() {
//   const navigate = useNavigate();

//   return (
//     <div className="relative">
//       <img className="w-full h-screen object-cover" src="https://www.hotelscombined.com/himg/da/c2/4f/agoda-435270-113568793-201815.jpg" alt="startimage" />
//       <div className="absolute top-4 left-4 flex items-center space-x-4">
//         <img className="h-12" src={logo} alt="logo" />
//         <div className="flex items-center space-x-4">
//           <button className="text-white font-semibold cursor-pointer hover:underline" onClick={() => navigate("/signup")}>Signup</button>
//           <button className="text-white font-semibold cursor-pointer hover:underline" onClick={() => navigate("/login")}>Login</button>
//         </div>
//       </div>
//       <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
//         <h1 className="text-5xl font-bold mb-4">FEEL LIKE HOME</h1>
//         <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg">
//           <h3 className="text-2xl mb-2">Premium Accommodation</h3>
//           <p className="text-lg">Let's find out a better place with full customer satisfaction. Come to us and have an experience with good memories.</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Startpage;
