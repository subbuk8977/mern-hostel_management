import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { GoLocation } from "react-icons/go"
import { FaRegHeart, FaHeart } from "react-icons/fa"
import { BsPerson } from "react-icons/bs"
import { GiHandheldFan } from "react-icons/gi"
import "./Displayhostel.css"
import PropTypes from 'prop-types'

Displayhostel.propTypes = {
  userid: PropTypes.shape({
    data: PropTypes.shape({
      _id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  location: PropTypes.string
}

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
          )) : <h5 className='deafultfavtext'>You Currently Dont Have Favorite Hostels</h5>}
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
