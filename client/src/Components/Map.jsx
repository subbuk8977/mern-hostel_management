import React, { useState } from 'react'
import {MapContainer,Marker,Popup,TileLayer} from "react-leaflet"
import "./Map.css"
import "leaflet/dist/leaflet.css"
import { Icon } from 'leaflet'
import Mapcurrentlocation from './Mapcurrentlocation'
import MapRouting from './MapRouting'
import L from "leaflet"
function Map(props) {
  const [currentlocationenable,setCurrentlocationenable]=useState(false)
  const icon=new Icon({
    iconUrl:"https://cdn-icons-png.flaticon.com/128/4985/4985836.png",
    iconSize:[40,40]
  })
  const currentloactionicon=new Icon({
    iconUrl:"https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize:[40,40]
  })
  const location=Mapcurrentlocation()
  return (
    <div>
    <MapContainer center={[props.hostel.lat,props.hostel.lng]} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[props.hostel.lat,props.hostel.lng]} icon={icon}>
    <Popup>
      <div className='mapwrapdiv'>
      <img className='hotelimagesinmap' src={props.hostel.hostelimage} alt="hotelimagesinmap"></img>
      <p className='mappopupcontent'>{props.hostel.hostelname}</p>
      <p>{props.hostel.distancefrommailocation} Km from {props.hostel.mainlocation}</p>
      </div>
    </Popup>
  </Marker>
  {currentlocationenable && location.loaded && !location.error &&(
    <Marker position={[location.coordinates.lat,location.coordinates.lng]} icon={currentloactionicon}>
      <Popup><p>Current Location</p></Popup>
    </Marker>
  )}
  {currentlocationenable &&<MapRouting hlat={props.hostel.lat} hlng={props.hostel.lng} clat={location.coordinates.lat} clng={location.coordinates.lng}></MapRouting>}
</MapContainer>
<button onClick={()=>setCurrentlocationenable(true)} className='currentlocationbutton'>See Your location</button>
    </div>
  )
}
let defaulticon=L.icon({
  iconUrl:"https://cdn-icons-png.flaticon.com/512/9800/9800512.png",
  iconSize:[10,10]
})
L.Marker.prototype.options.icon=defaulticon
export default Map