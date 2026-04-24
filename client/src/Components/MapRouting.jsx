import  { useEffect } from 'react'
import L from "leaflet"
import "leaflet-routing-machine"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"
import { useMap } from 'react-leaflet'
import PropTypes from 'prop-types'

MapRouting.propTypes = {
  hlat: PropTypes.number.isRequired,
  hlng: PropTypes.number.isRequired,
  clat: PropTypes.number.isRequired,
  clng: PropTypes.number.isRequired
}


function MapRouting(props) {
    const map=useMap()
    useEffect(()=>{
        L.Routing.control({
            waypoints:[
                L.latLng(props.hlat,props.hlng),
                L.latLng(props.clat,props.clng)
            ],
            lineOptions:{
                styles:[{
                    color:"blue"
                }]
            }
        },[]).addTo(map)
    })
  return null
}

export default MapRouting