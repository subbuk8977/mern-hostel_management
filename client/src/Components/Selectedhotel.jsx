import "./Selectedhostel.css"
import {useLocation, useNavigate} from "react-router-dom"
import {BsFillPersonVcardFill, BsPerson, BsPersonCircle} from "react-icons/bs"
import {GiHandheldFan} from "react-icons/gi"
import {GoLocation} from "react-icons/go"
import {GrDocumentTime, GrPhone} from "react-icons/gr"
import {IoBedOutline} from "react-icons/io5"
import { GoPerson } from "react-icons/go"
import Map from './Map'
import { useState } from "react"
import axios from "axios"
import ReactSwitch from "react-switch"
import Alert from "./Alert"
function Selectedhotel() {
  const history=useNavigate()
  const data=useLocation()
  const [actualreviewdata,setactualreview]=useState()
  const [togglecheckarray,setTogglecheckarray]=useState([])
  const [enableservice,setEnableservice]=useState(false)
  const [review,setReview]=useState()
  const [reviewrate,setReviewrate]=useState()
  const [reviewdata,setreviewdata]=useState({hostelid:data.state.hostel._id,reviewarray:{}})
  const [enableaddreview,SetenableaddReview]=useState(false)
  const [hostelprice,setHostelPrice]=useState(data.state.hostel.price)
  const [enablebooking,setEnablebooking]=useState(false)
  const [bookingdata,setBookingdata]=useState({Bookeduserid:"",Bookedhostelid:"",Noofrooms:""})
  const [Noofroom,setNoofroom]=useState(1)
  const [viewreview,setViewreview]=useState(false)
  const [loadings,setLodings]=useState(false)
  const amenty=data.state.hostel.amenities.split(",")
  const nearbyplace=data.state.hostel.nearbyplace.split(",")
  const images=data.state.hostel.hostelmoreimage.split(",")
  const services=data.state.hostel.service.split(",")
  const bookingfunction=()=>{
  setEnableservice(false)
  setEnablebooking(true)
  setBookingdata({Bookeduserid:data.state.user._id,Bookedhostelid:data.state.hostel,Noofrooms:Noofroom,Bookingprice:hostelprice,customise:data.state.hostel.price===hostelprice ?false :true})
  }
  const servicefunction=()=>{
  setEnableservice(true) 
  setEnablebooking(false)
  }
  const increment=()=>{
    if(Noofroom<4)
    setNoofroom(Noofroom+1)
    setBookingdata({...bookingdata,Noofrooms:Noofroom<4 ? Noofroom+1: Noofroom})
  }
  const decrement=()=>{
    if(Noofroom>1)
    setNoofroom(Noofroom-1)
    setBookingdata({...bookingdata,Noofrooms:Noofroom>1 ?Noofroom-1:Noofroom})
  }
  const togglehandle=(key,item)=>{
    if(togglecheckarray.includes(key))
    {
      setTogglecheckarray(togglecheckarray.filter((item)=>item!==key))
      if(item==="iron")
      setHostelPrice(hostelprice+data.state.hostel.noironing)
      if(item==="wash")
      setHostelPrice(hostelprice+data.state.hostel.nowash)
      if(item==="food")
      setHostelPrice(hostelprice+data.state.hostel.nofood)
    }
    else
    {
      setTogglecheckarray([...togglecheckarray,key])
      if(item==="iron")
      setHostelPrice(hostelprice-data.state.hostel.noironing)
      if(item==="wash")
      setHostelPrice(hostelprice-data.state.hostel.nowash)
      if(item==="food")
      setHostelPrice(hostelprice-data.state.hostel.nofood)
      console.log('price',hostelprice)
    }
  }
  const conformbookingfunction=()=>{
    console.log("bookdata",bookingdata)
    if(data.state.user.contactno)
    {
    axios.post("http://localhost:8000/addbooking",{data:bookingdata}).then((responce)=>{
      console.log(responce.data)
      if(responce.data===2)
      alert("You cannot Book More than 2 hostels from a Account")
      else {
      if(responce.data==="Failed")
      alert("Failed To Book Hostel")
      else
      history("/booksuccess",{state:{data:data.state}})
    }
    })
    }
    else
    {
    alert("Please Fill the Your details in Profile ,Then Book the Hostel")
    history("/profileupdate",{state:{profile:data.state.user}})
    }
  }
  const customisefunction=()=>{
    setEnableservice(false)
  }
  const checkaddReview=()=>{
    axios.post(`http://localhost:8000/checkbookeduser/${data.state.user._id}`,{data:data.state.hostel._id}).then((responce)=>{
      if(responce.data.success==="CA")
       SetenableaddReview(true)
      else
      alert("First You Need to Book This Hostel To Review....") 
    })
  }
  const [notificationenable,setNotificationenable]=useState(false)
  const addreviewcall=()=>{
  setLodings(true)
  setreviewdata({...reviewdata,reviewarray:{userid:data.state.user._id,username:data.state.user.username,review:review,reviewrate:reviewrate}})
  console.log("ressssssssss",reviewdata)
  reviewdata.reviewarray.review && axios.post("http://localhost:8000/addreview",{data:reviewdata}).then((responece)=>{
    console.log(responece)
    if(responece.data.success==="NSS" || responece.data.success==="SS")
    {
      setLodings(false)
      SetenableaddReview(false)
      setNotificationenable(true)
      setTimeout(()=>{
        setNotificationenable(false)
      },2500)
    }
  })
  }
  const fetchviewdatafun=()=>{
    setViewreview(true)
    SetenableaddReview(false)
    axios.get(`http://localhost:8000/getreview/${data.state.hostel._id}`).then((responce)=>
    {
      setactualreview(responce.data[0].reviewarray)
    })
  }
  return (
    <div className="selectmaindiv">
    <img className="selectedbgimg" src="http://www.wallpaperup.com/uploads/wallpapers/2013/07/16/119325/7b375e1b4e908d53fd1b53394bb31832.jpg" alt="imagesbg"></img>
    <button className="backtohome" onClick={()=>history("/account",{state:{data:data.state.user}})}>Back To Home</button>
    <div className="selectmaindivfistinner">
    <div className="selectmainleftmain">
    <div>
    <p className="amenityheadingp">Amenities we provides.....</p>
    <div className="amenitymaindiv">
    {amenty.map((item)=>{
      if(item==="Wifi")
      return(
        <div className="amenitydiv">
          <img src="https://cdn-icons-png.flaticon.com/128/747/747982.png" alt="wifi"></img>
          <p>Wifi</p>
        </div>
      )
      else if(item==="vehicle")
      return(
        <div className="amenitydiv">
          <img src="https://cdn-icons-png.flaticon.com/128/4277/4277309.png" alt="wifi"></img>
          <p>Travel Service</p>
        </div>
      )
      else if(item==="Ac")
      return(
        <div className="amenitydiv">
          <img src="https://cdn-icons-png.flaticon.com/128/911/911409.png" alt="wifi"></img>
          <p>Ac</p>
        </div>
      )
      else if(item==="Gym")
      return(
        <div className="amenitydiv">
          <img src="https://cdn-icons-png.flaticon.com/128/2871/2871250.png" alt="wifi"></img>
          <p>Gym</p>
        </div>
      )
      else if(item==="Inverter")
      return(
        <div className="amenitydiv">
          <img src="https://cdn-icons-png.flaticon.com/128/10820/10820540.png" alt="wifi"></img>
          <p>Inverter</p>
        </div>
      )
      else if(item==="food")
      return(
        <div className="amenitydiv">
          <img src="https://cdn-icons-png.flaticon.com/128/10896/10896146.png" alt="wifi"></img>
          <p>Homely food</p>
        </div>
      )
    })}</div></div>
    <div className="contentdivofselect">
    <div className="contentdivofselectleft">
      <h3>{data.state.hostel.hostelname}</h3>
      <div className="contentsubflexdiv">
      <GoLocation/>
      <p className="contentdivofselectleftp">{data.state.hostel.location}</p>
      </div>
      <div className="contentsubflexdiv">
      <IoBedOutline />
      <p className="contentdivofselectleftp"> BedType: {data.state.hostel.category}</p>
      </div>
      <p className="descriptionpofselect">{data.state.hostel.description}</p>
    </div>
    <div className="contentdivofselectright">
      <div className="contentsubflexdiv">
        <GrPhone />
        <p className="contentdivofselectleftp">{data.state.hostel.contactno}</p>
      </div>
      <div className="contentsubflexdiv">
        <GoPerson />
        <p className="contentdivofselectleftp">Owner:{data.state.hostel.ownername}</p>
      </div>
      <div className="contentsubflexdiv">
        <GrDocumentTime />
        <p className="contentdivofselectleftp">Tenure:{data.state.hostel.tenure} Days</p>
      </div>
      <div className="contentsubflexdiv">
      <BsFillPersonVcardFill />
        <p className="contentdivofselectleftp">Services for Students</p>
      </div>
    </div>
    </div>
    <Map hostel={data.state.hostel} /> 
    <div>
    <div className="maprightdiv">
     <h3 className="nearbyh3">Nearby Places.......</h3>
     <div>
      <ul>
        {nearbyplace.map((item)=>{
          return(
            <li className="nearbyli">{item}</li>
          )
        })}
      </ul>
     </div>
    </div>
    <div className="reviebuttondiv">
    <button onClick={checkaddReview}>Add Review</button>
     <button onClick={fetchviewdatafun}>View Review</button></div>
    </div>
    <div className="infodiv">
    <div> <p className="policyp">Read the Hostel Policy Before Booking Click View Service........</p>
    </div></div>
    </div>
    <div className="selectmainrightmain">
      <img src={data.state.hostel.hostelimage} alt="hostelimage"></img>
      <div className="selectimagetextdiv"><h3>Explore the way of Living</h3>
      <p>Lets Stay peace</p>
      </div>
      <h5 className="subimageheading">Take a Look on the Service</h5>
      <div className="wrapofhostelserviceimagesectiondiv">
      <div className="hostelserviceimagesectiondiv">
        <img src={images[0]} alt="imagesservisec"></img>
        <div className="selectionimagecontent"><h4>Food and Beverage</h4>
        <p>Healty food shared with love and peace with Variety of choices</p>
      </div>
      </div>
      <div className="hostelserviceimagesectiondiv">
        <img src={images[1]} alt="imagesservisec"></img>
        <div className="selectionimagecontent"><h4>Bed Rooms Feature</h4>
        <p>Well Manitained Bedroom with Bathroom Facility</p>
      </div>
      </div>
    </div>
    <div className="line"></div>
    <div className="selctedhotelpricemaindiv">
      <div className="booksmalldiv">
      <h3>Rs {hostelprice} Rs/Month</h3>
      <p>Including All Taxes</p> 
      {hostelprice!==data.state.hostel.price && <p className="servicecust">Services Customized Price</p>}
      </div>
      <div className="booksmalldivleft">
      <div><BsPerson />
       <p>Men</p></div>
       <div><GiHandheldFan/>
       <p>Ac</p></div>
      </div>
    </div>
    {data.state.hostel.customiseservice===true ?<p className="sustimizetext" onClick={servicefunction}>View Service or Customize</p>:<p className="sustimizetext">Connot customise service</p>}
    <button className="Bookingbutton" onClick={bookingfunction}>Book Now</button>
    </div>
   </div>
   {enableservice && <div className="divofviewservice">
    <div className="serviceborder">
    <img src="https://cdn-icons-png.flaticon.com/128/2732/2732657.png" alt="close"onClick={()=>setEnableservice(false)} className="serviceborderimg"></img>
    <div>
    <h3 className="customizehead">Customize services</h3>
    <p className="pofcustomixe">Select the Option that you need</p>
    {services.map((item,key)=>{
      if(item==="iron")
      return(
      <div className="cutomizeoptdiv">
     <div className="warpofeachservice">
      <img src="https://cdn-icons-png.flaticon.com/128/79/79677.png" alt="service" className="imageserviceofdiv"></img>
      <p className="ptag">Irons</p>
      <ReactSwitch checked={togglecheckarray.includes(key)?false :true}  onChange={()=>togglehandle(key,item)}className="toggle" key={key}/>
     </div>
     <p className="reductionp">Reduction -{data.state.hostel.noironing}rs/month</p>
    </div>
      )
      else if(item==="food")
      return(
      <div className="cutomizeoptdiv">
     <div className="warpofeachservice">
      <img src="https://cdn-icons-png.flaticon.com/128/857/857681.png" alt="service" className="imageserviceofdiv"></img>
      <p className="ptag">Food</p>
      <ReactSwitch checked={togglecheckarray.includes(key)?false :true}  onChange={()=>togglehandle(key,item)} className="toggle" key={key}/>
     </div>
     <p className="reductionp">Reduction -{data.state.hostel.nofood}rs/month</p>
    </div>
      )
      else if(item==="wash")
      return(
        <div className="cutomizeoptdiv">
     <div className="warpofeachservice">
      <img src="https://cdn-icons-png.flaticon.com/128/1104/1104590.png" alt="service" className="imageserviceofdiv"></img>
      <p className="ptag">wash</p>
      <ReactSwitch checked={togglecheckarray.includes(key)?false :true}  onChange={()=>togglehandle(key,item)} className="toggle" key={key}/>
     </div>
     <p className="reductionp">Reduction -{data.state.hostel.nowash}rs/month</p>
    </div>
      )
    })}
    </div>
    <p className="priceinadjust">Customised Price :{hostelprice}rs/Month</p>
    <button className="conformservicebutton" onClick={customisefunction}>Conform Customise Services</button>
    </div>
   </div>}
   {enablebooking && <div className="bookingenablediv">
   <img src="https://cdn-icons-png.flaticon.com/128/10613/10613604.png" alt="images" className="closeofbook" onClick={()=>setEnablebooking(false)}></img>
   <img src={data.state.hostel.hostelimage} alt="images" className="bookimage"></img>
   <h3>{data.state.hostel.hostelname}</h3>
   <div className="bookingenableinnerflex">
   <h4>Price {hostelprice} Rs/Month</h4>
   <p>{data.state.hostel.location}</p>
   </div>
   <div className="counterdiv">
   <p>No of Rooms to Book:</p>
   <button onClick={decrement}>-</button>
   <h3>{Noofroom}</h3>
   <button onClick={increment}>+</button>
   </div>
   <button className="conformbookingbutton" onClick={conformbookingfunction}>Conform Booking</button>
   </div>}
   {enableaddreview && <div className="addreviewdiv">
   <img src="https://cdn-icons-png.flaticon.com/128/2734/2734822.png" alt="closert" className="closerevieadaa" onClick={()=>SetenableaddReview(false)}></img>
   <h4 className="bookerh4">Hey {data.state.user.username}, Give Your Valuable Review</h4>
   <input type="text" Placeholder="Give Your Feed Back Here" className="reviewinput" onChange={(e)=>setReview(e.target.value)}></input>
   <p className="giveratep">Give a Rating Out of 5</p>
   <input type="number" className="revewrate" onChange={(e)=>setReviewrate(e.target.value)}></input>
   <button className="addreviwbutton" onClick={addreviewcall}>Add Review</button>
   {loadings && <h3>Adding Review.....</h3>}
   </div>}
   {viewreview && <div className="viewreviewdiv">
    <img src="https://cdn-icons-png.flaticon.com/128/2732/2732657.png" alt="" className="closeofopenviewreviw" onClick={()=>setViewreview(false)}></img>
    <h3 className="headofreview">Here the Revies...</h3>
     {actualreviewdata ? actualreviewdata.map((item,key)=>{
      return(
        <div className={parseInt(item.reviewrate)>3 ?"manidivofreview":"manidivofreviews"}>
        <div className="emajomaindiv">
        <div className="reviewrowperson">
        <BsPersonCircle/>
        <p className="reviewuser">{item.username}</p>
        </div>
        <img src={parseInt(item.reviewrate)>3?"https://cdn-icons-png.flaticon.com/128/10851/10851206.png":parseInt(item.reviewrate)===3 ?"https://cdn-icons-png.flaticon.com/128/742/742923.png":"https://cdn-icons-png.flaticon.com/128/742/742774.png"} alt="imago" className="emoji"></img>
        </div>
        <div className="diddidvreview">
          <p>{item.review}</p>
          <p>Rate: {item.reviewrate}/5</p>
        </div>
        </div>
      )
     }):<h4 className="deafultviewa">Currently This hostel Have no Reviews</h4>}
   </div>}
   {notificationenable && <Alert data={"Thankyou For Submiting Your Review"}/>}
   </div>
  )
}

export default Selectedhotel