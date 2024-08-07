// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router'
// import {GoLocation} from "react-icons/go"
// import {FaRegHeart,FaHeart} from "react-icons/fa"
// import {BsPerson} from "react-icons/bs"
// import {GiHandheldFan} from "react-icons/gi"
// import "./Displayhostel.css"
// function Displayhostel(props) {
// const history =useNavigate()
// const [datas,setDatas]=useState([""])
// const [filterenable,setFilterenable]=useState(false)
// const [sortenable,Setsortenable]=useState(false)
// const [options,setOptions]=useState({})
// const [sorted,setSorted]=useState()
// const [displaysort,setDisplaysort]=useState(false)
// const [favdatarray,setFavdataarray]=useState([])
// const [favdatarraysort,setFavdataarraysort]=useState([])
// const [favdivenable,setFavdiv]=useState(false)
// const [fetchedfavdata,setFecthedfavdata]=useState()
// const id=props.userid.data._id
// let sorteddata;
// useEffect(()=>{
// axios.get("https://mern-hostel-management-api.vercel.app/fetchhotel").then((responce)=>{
//   console.log(responce.data)
//   setDatas(responce.data)
// })
// axios.get(`https://mern-hostel-management-api.vercel.app/initialfav/${id}`).then((responce)=>{
//     console.log("new promise",responce.data)
//     if(responce.data.favhotelidarray)
//     setFavdataarray(responce.data.favhotelidarray)
//     else
//     setFavdataarray([])
//   })
// },[id])
// const handle=(e)=>{
//   setOptions({...options,[e.target.name]:e.target.value})
// }
// const favdivfunction=()=>{
//   setFavdiv(true)
//   axios.get(`https://mern-hostel-management-api.vercel.app/fetchfavhotel/${props.userid.data._id}`).then((responce)=>{
//     console.log("favdata",responce)
//     setFecthedfavdata(responce.data)
//   })
// }
// const deletefavfunc=(id)=>{
//   axios.post(`https://mern-hostel-management-api.vercel.app/${props.userid.data._id}`,{data:id}).then((responce)=>{
//     if(responce)
//     favdivfunction()
//   })
// }
// const addfavid=(item)=>{
// console.log("correct favdiv",favdatarray,favdatarray.includes(item._id))
// favdatarray.includes(item._id) ? setFavdataarray(favdatarray.filter((value)=>value!==item._id)):setFavdataarray([...favdatarray,item._id])
// axios.post(`https://mern-hostel-management-api.vercel.app/${props.userid.data._id}`,{data:[item._id]}).then((responce)=>console.log("backs",responce))
// }
// const addfavidsort=(item)=>{
//   console.log("fav clicked",favdatarraysort.includes(item._id),favdatarraysort,item._id)
//   favdatarraysort.includes(item._id) ? setFavdataarraysort(favdatarraysort.filter((value)=>value!==item._id)):favdatarraysort.push(item._id)
//   axios.post(`https://mern-hostel-management-api.vercel.app/${props.userid.data._id}`,{data:[item._id]}).then((responce)=>console.log("backs",responce))
//   }
// let hostelarray
// hostelarray= !displaysort ? datas.filter((data)=>{
//   return data.mainlocation===props.location
// }): datas.filter((data)=>{
//   if(options.Gender && options.Ac && options.Wifi)
//   return data.mainlocation===props.location && data.hosteltype===options.Gender && data.Wifi===options.Wifi && data.Ac===options.Ac
//   else if(options.Gender && options.Ac)
//   return data.mainlocation===props.location && data.hosteltype===options.Gender && data.Ac===options.Ac
//   else if(options.Gender && options.Wifi)
//   return data.mainlocation===props.location && data.hosteltype===options.Gender && data.Wifi===options.Wifi
//   else if(options.Gender)
//   return data.mainlocation===props.location && data.hosteltype===options.Gender
//   else if(options.Ac)
//   return data.mainlocation===props.location && data.Ac===options.Ac
//   else if(options.Wifi)
//   return data.mainlocation===props.location && data.Wifi===options.Wifi
//   else
//   return data.mainlocation===props.location
  
// })
// let hostel=hostelarray.map((item)=>{
//   if(item.Availableroom>0)
//   return(
//     <div className='hostelmaindiv'>
//       <div className='hostelwrap'>
//         <img src={item.hostelimage} alt="img"></img>
//         <div className='hostelcontent' onClick={()=>history("/sh",{state:{user:props.userid.data,hostel:item}})}>
//         <h3>{item.hostelname}</h3>
//         <p>{item.description}</p>
//         <div className='locationcontentdiv'>
//         <div><GoLocation />
//         <p className='locationcontent'>{item.location}</p>
//         </div>
//         <p className='ptagfordistancefrommainloaction'>{item.distancefrommailocation}km from {item.mainlocation}</p>
//         </div>
//         <div className='ratewithfavdiv'>
//         {item.customiseservice===true ?<p className='customisep'>Services and Price can be Customise</p> :<p className='customisepp'>Services and Price are Fixed</p>}
//         <h4 onClick={()=>console.log("pleaseeelookhere",favdatarray)}>Rate {item.price} Rs/Month</h4>
//         <div>
//         <GiHandheldFan />
//         <p>{item.Ac}</p>
//         <BsPerson />
//         <p>{item.hosteltype}</p>
//         </div>
//         </div>
//         </div>
//         {(favdatarray && favdatarray.includes(item._id))?<FaHeart onClick={()=>addfavid(item)}/>:<FaRegHeart onClick={()=>addfavid(item)}/>}
//       </div>
//     </div>
//   )
//   else
//   return(
//   <div className='hostelmaindiv'>
//   <div className='hostelwrap'>
//     <img src={item.hostelimage} alt="img"></img>
//     <div className='hostelcontent'>
//     <div className='unavilablewrap'></div>
//     <h4 className='unvalibleh4content'>Currently Unaviable</h4>
//     <h3>{item.hostelname}</h3>
//     <p>{item.description}</p>
//     <div className='locationcontentdiv'>
//         <div><GoLocation />
//         <p className='locationcontent'>{item.location}</p>
//         </div>
//         <p className='ptagfordistancefrommainloaction'>{item.distancefrommailocation} from {item.mainlocation}</p>
//         <div className='ratewithfavdiv'></div>
//         </div>
//     <h4>Rate {item.price}Rs/Month</h4>
//     </div>
//   </div>
// </div>)
// })
// const filter=()=>{
// setFilterenable(true)
// console.log("here go")
// }
// const sortfunction=()=>{
//   Setsortenable(true)
//   setDisplaysort(false)
//   console.log("options are",options)
//   const cl=document.querySelectorAll(".radios")
//   cl.forEach(value=>value.checked=false)
// }
// const filters=()=>{
//   setDisplaysort(true)
//   console.log("in opt",options)
// }
// const close=()=>{
//   setFilterenable(false)
//   Setsortenable(false)
// }
// const sort=(no)=>{
//  sorteddata=hostelarray.sort((a,b)=>a.price>b.price ?  no===1 ? 1:-1 : no===1 ? -1:1)
//  let sorteddisplay=(sorteddata).map((item)=>{
//   if(item.Availableroom>0)
//     return(<div className='hostelmaindiv'>
//     <div className='hostelwrap'>
//       <img src={item.hostelimage} alt="img"></img>
//       <div className='hostelcontent' onClick={()=>history("/sh",{state:{user:props.userid.data,hostel:item}})}>
//       <h3>{item.hostelname}</h3>
//       <p>{item.description}</p>
//       <div className='locationcontentdiv'>
//       <div><GoLocation />
//       <p className='locationcontent'>{item.location}</p>
//       </div>
//       <p className='ptagfordistancefrommainloaction'>{item.distancefrommailocation}km from {item.mainlocation}</p>
//       </div>
//       <div className='ratewithfavdiv'>
//       {item.customiseservice===true ?<p className='customisep'>Services and Price can be Customise</p> :<p className='customisepp'>Services and Price are Fixed</p>}
//       <h4>Rate {item.price} Rs/Month</h4>
//       <div>
//       <GiHandheldFan />
//       <p>{item.Ac}</p>
//       <BsPerson />
//       <p>{item.hosteltype}</p>
//       </div>
//       </div>
//       </div>
//       {(favdatarraysort && favdatarraysort.includes(item._id))?<FaHeart onClick={()=>addfavidsort(item)}/>:<FaRegHeart onClick={()=>addfavidsort(item)}/>}
//     </div>
//   </div>
//     )
//     else
//     return(
//       <div className='hostelmaindiv'>
//   <div className='hostelwrap'>
//     <img src={item.hostelimage} alt="img"></img>
//     <div className='hostelcontent'>
//     <div className='unavilablewrap'></div>
//     <h4 className='unvalibleh4content'>Currently Unaviable</h4>
//     <h3>{item.hostelname}</h3>
//     <p>{item.description}</p>
//     <div className='locationcontentdiv'>
//         <div><GoLocation />
//         <p className='locationcontent'>{item.location}</p>
//         </div>
//         <p className='ptagfordistancefrommainloaction'>42km from {item.mainlocation}</p>
//         <div className='ratewithfavdiv'></div>
//         </div>
//     <h4>Rate {item.price}Rs/Month</h4>
//     </div>
//   </div>
// </div>
//     )
//   })
//   props.setSortenable(true)
//   setSorted(sorteddisplay)
// }
//   return (
//     <div className='displaymain'>
//     <div className='displayoptions'>
//     <p className='resulttext'>Results Shown for {props.location}</p>
//     <div className='displaybuttondiv'>
//       <button onClick={favdivfunction}>Liked</button>
//       <button onClick={filter}>Sort</button>
//       <button onClick={sortfunction}>Filter</button>
//     </div>
//     </div>
//     <div className='hostelrow' onClick={close}>{props.sortenable ? sorted : hostel}</div>
//     {favdivenable && <div className='favdivwrap'>
//     <img src="https://cdn-icons-png.flaticon.com/256/10449/10449858.png" className='closeoffavimage' onClick={()=>setFavdiv(false)} alt="close"></img>
//       {(fetchedfavdata && fetchedfavdata.length>0) ? fetchedfavdata.map((item)=>{
//         return(
//           <div className='divofmappedfavdata'>
//             <img src={item.hostelimage} alt="images" className='divofmappedfavdataimg'></img>
//             <div onClick={()=>history("/sh",{state:{user:props.userid.data,hostel:item}})}>
//               <h3>{item.hostelname}</h3>
//               <h6>Rs {item.price}/Month</h6>
//             </div>
//             <img src="https://cdn-icons-png.flaticon.com/128/10374/10374182.png" alt="delete" className='deletefabutton' onClick={()=>deletefavfunc(item._id)}></img>
//           </div>
//         )
//       }):<h5 className='deafultfavtext'>You Currenty Didnt have Favorite Hostel</h5>}
//     </div>}
//     <div className={filterenable ?'filterdiv':'filterdivoff'}>
//       <h3>Price</h3>
//       <p onClick={()=>sort(1)}>Low to High</p>
//       <p onClick={()=>sort(2)}>High to Low</p>
//     </div>
//     {sortenable && <div className='sortdiv'>
//       <div className='sorttoinnerdiv'>
//         <p>Gender</p>
//         <div><input type="radio" value="Men" name="Gender" onClick={handle} className='radios'></input><label>Male</label>
//         <input type="radio" value="Women" name="Gender"  className='radios' onClick={handle}></input><label>Female</label></div>
//       </div>
//       <div className='sorttoinnerdiv'>
//         <p>Wifi Availability</p>
//         <div><input type="radio" name="Wifi" value="Yes"  onClick={handle} className='radios'></input><label>Free Wifi</label>
//         <input type="radio" name="Wifi" value="No"  onClick={handle} className='radios'></input><label>Not Wifi</label></div>
//       </div>
//       <div className='sorttoinnerdiv'>
//         <p>Ac Or Non Ac</p>
//         <div><input type="radio" name="Ac" value="Ac"  onChange={handle} className='radios'></input><label>Ac</label>
//         <input type="radio" name="Ac" value="Non Ac"  onChange={handle} className='radios'></input><label>Non Ac</label>
//         </div>
//         <button type="submit" onClick={filters}>Set Filter</button>
//       </div>
//     </div>}
//     </div>
//   )
// }



import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { GoLocation } from "react-icons/go"
import { FaRegHeart, FaHeart } from "react-icons/fa"
import { BsPerson } from "react-icons/bs"
import { GiHandheldFan } from "react-icons/gi"
import "./Displayhostel.css"

function Displayhostel(props) {
  const history = useNavigate()
  const [datas, setDatas] = useState([])
  const [filterEnable, setFilterEnable] = useState(false)
  const [sortEnable, setSortEnable] = useState(false)
  const [options, setOptions] = useState({})
  const [sortedData, setSortedData] = useState([])
  const [displaySort, setDisplaySort] = useState(false)
  const [favDataArray, setFavDataArray] = useState([])
  const [favDataArraySort, setFavDataArraySort] = useState([])
  const [favDivEnable, setFavDivEnable] = useState(false)
  const [fetchedFavData, setFetchedFavData] = useState([])
  const id = props.userid.data._id

  useEffect(() => {
    axios.get("http://localhost:8000/fetchhotel")
      .then(response => {
        console.log("Fetched hostels data:", response.data)
        setDatas(response.data)
      })
      .catch(error => {
        console.error("Error fetching hostels:", error)
      })

    axios.get(`http://localhost:8000/initialfav/${id}`)
      .then(response => {
        console.log("Initial favorite hostels:", response.data)
        if (response.data.favhotelidarray) {
          setFavDataArray(response.data.favhotelidarray)
        } else {
          setFavDataArray([])
        }
      })
      .catch(error => {
        console.error("Error fetching favorite hostels:", error)
      })
  }, [id])

  const handleOptionChange = (e) => {
    setOptions({ ...options, [e.target.name]: e.target.value })
  }

  const fetchFavData = () => {
    axios.get(`http://localhost:8000/fetchfavhotel/${id}`)
      .then(response => {
        console.log("Fetched favorite hostels:", response.data)
        setFetchedFavData(response.data)
      })
      .catch(error => {
        console.error("Error fetching favorite hostels data:", error)
      })
  }

  const deleteFavFunc = (hostelId) => {
    axios.post(`http://localhost:8000/deletefav/${id}`, { data: hostelId })
      .then(() => {
        fetchFavData()
      })
      .catch(error => {
        console.error("Error deleting favorite hostel:", error)
      })
  }

  const toggleFavorite = (item) => {
    const updatedFavArray = favDataArray.includes(item._id)
      ? favDataArray.filter(value => value !== item._id)
      : [...favDataArray, item._id]

    setFavDataArray(updatedFavArray)
    axios.post(`http://localhost:8000/favhotel/${id}`, { data: [item._id] })
      .catch(error => {
        console.error("Error updating favorite hostel:", error)
      })
  }

  const toggleFavoriteSort = (item) => {
    const updatedFavArray = favDataArraySort.includes(item._id)
      ? favDataArraySort.filter(value => value !== item._id)
      : [...favDataArraySort, item._id]

    setFavDataArraySort(updatedFavArray)
    axios.post(`http://localhost:8000/favhotel/${id}`, { data: [item._id] })
      .catch(error => {
        console.error("Error updating favorite hostel (sorted):", error)
      })
  }

  const filterHostels = () => {
    return datas.filter(data => {
      return (!displaySort || data.mainlocation === props.location) &&
        (!options.Gender || data.hosteltype === options.Gender) &&
        (!options.Ac || data.Ac === options.Ac) &&
        (!options.Wifi || data.Wifi === options.Wifi)
    })
  }

  const sortHostels = (order) => {
    const sorted = [...filterHostels()].sort((a, b) => order === 1 ? a.price - b.price : b.price - a.price)
    setSortedData(sorted)
    setSortEnable(true)
  }

  const hostelList = (sortEnable ? sortedData : filterHostels()).map(item => (
    <div className='hostelmaindiv' key={item._id}>
      <div className='hostelwrap'>
        <img src={item.hostelimage} alt="img" />
        <div className='hostelcontent' onClick={() => history("/sh", { state: { user: props.userid.data, hostel: item } })}>
          <h3>{item.hostelname}</h3>
          <p>{item.description}</p>
          <div className='locationcontentdiv'>
            <div><GoLocation />
              <p className='locationcontent'>{item.location}</p>
            </div>
            <p className='ptagfordistancefrommainloaction'>{item.distancefrommailocation}km from {item.mainlocation}</p>
          </div>
          <div className='ratewithfavdiv'>
            {item.customiseservice ? <p className='customisep'>Services and Price can be Customised</p> : <p className='customisepp'>Services and Price are Fixed</p>}
            <h4>Rate {item.price} Rs/Month</h4>
            <div>
              <GiHandheldFan />
              <p>{item.Ac}</p>
              <BsPerson />
              <p>{item.hosteltype}</p>
            </div>
          </div>
        </div>
        {(favDataArray.includes(item._id))
          ? <FaHeart onClick={() => toggleFavorite(item)} />
          : <FaRegHeart onClick={() => toggleFavorite(item)} />}
      </div>
    </div>
  ))

  const handleSortClick = (order) => {
    sortHostels(order)
    setFilterEnable(false)
    setSortEnable(true)
  }

  const handleFilterClick = () => {
    setDisplaySort(true)
    setSortEnable(false)
  }

  const closeFilters = () => {
    setFilterEnable(false)
    setSortEnable(false)
  }

  return (
    <div className='displaymain'>
      <div className='displayoptions'>
        <p className='resulttext'>Results Shown for {props.location}</p>
        <div className='displaybuttondiv'>
          <button onClick={() => { setFavDivEnable(true); fetchFavData() }}>Liked</button>
          <button onClick={handleSortClick.bind(null, 1)}>Sort: Low to High</button>
          <button onClick={handleSortClick.bind(null, 2)}>Sort: High to Low</button>
          <button onClick={handleFilterClick}>Filter</button>
        </div>
      </div>
      <div className='hostelrow' onClick={closeFilters}>
        {hostelList}
      </div>
      {favDivEnable && (
        <div className='favdivwrap'>
          <img src="https://cdn-icons-png.flaticon.com/256/10449/10449858.png" className='closeoffavimage' onClick={() => setFavDivEnable(false)} alt="close" />
          {(fetchedFavData.length > 0) ? fetchedFavData.map(item => (
            <div className='divofmappedfavdata' key={item._id}>
              <img src={item.hostelimage} alt="images" className='divofmappedfavdataimg' />
              <div onClick={() => history("/sh", { state: { user: props.userid.data, hostel: item } })}>
                <h3>{item.hostelname}</h3>
                <h6>Rs {item.price}/Month</h6>
              </div>
              <img src="https://cdn-icons-png.flaticon.com/128/10374/10374182.png" alt="delete" className='deletefabutton' onClick={() => deleteFavFunc(item._id)} />
            </div>
          )) : <h5 className='deafultfavtext'>You Currently Don't Have Favorite Hostels</h5>}
        </div>
      )}
      {filterEnable && (
        <div className='filterdiv'>
          <h3>Price</h3>
          <p onClick={() => handleSortClick(1)}>Low to High</p>
          <p onClick={() => handleSortClick(2)}>High to Low</p>
        </div>
      )}
      {sortEnable && (
        <div className='sortdiv'>
          <div className='sorttoinnerdiv'>
            <p>Gender</p>
            <div>
              <input type="radio" value="Men" name="Gender" onChange={handleOptionChange} className='radios' />
              <label>Male</label>
              <input type="radio" value="Women" name="Gender" onChange={handleOptionChange} className='radios' />
              <label>Female</label>
            </div>
          </div>
          <div className='sorttoinnerdiv'>
            <p>Wifi Availability</p>
            <div>
              <input type="radio" name="Wifi" value="Yes" onChange={handleOptionChange} className='radios' />
              <label>Free Wifi</label>
              <input type="radio" name="Wifi" value="No" onChange={handleOptionChange} className='radios' />
              <label>No Wifi</label>
            </div>
          </div>
          <div className='sorttoinnerdiv'>
            <p>Ac Or Non Ac</p>
            <div>
              <input type="radio" name="Ac" value="Ac" onChange={handleOptionChange} className='radios' />
              <label>Ac</label>
              <input type="radio" name="Ac" value="Non Ac" onChange={handleOptionChange} className='radios' />
              <label>Non Ac</label>
            </div>
            <button type="button" onClick={handleFilterClick}>Set Filter</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Displayhostel
