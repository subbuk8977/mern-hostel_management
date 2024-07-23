import  { useEffect } from 'react'
import L from "leaflet"
import "leaflet-routing-machine"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"
import { useMap } from 'react-leaflet'
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