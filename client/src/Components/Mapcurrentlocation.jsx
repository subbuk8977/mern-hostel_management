import { useEffect, useState } from 'react'
function Mapcurrentlocation() {
  const [location,setLocation]=useState({
    loaded:false,
    coordinates:{lan:"",lng:""}
  })
  const onSuccess=location=>{
    console.log("Current LOcation",location)
  setLocation({
    loaded:true,
    coordinates:{lat:10.410130,lng:76.214040}
  })
  }
  const onError=error=>{
    setLocation({
        loaded:true,
        error,
      })
  }
  useEffect(()=>{
  if(!("geolocation" in navigator)){
    onError({
        code:0
    })
  }
  navigator.geolocation.getCurrentPosition(onSuccess,onError)
  },[])
  return location
}

export default Mapcurrentlocation