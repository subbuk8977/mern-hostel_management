import React, { useState } from 'react'
import {searchdata} from "./Searchdata"
import "./Searchbar.css"
function Searchbar(props) {
  const [searchitem,setSearchitem]=useState("")
  const [selected,setSelected]=useState()
  const search=()=>{
  props.setLocation(selected)
  setSearchitem("")
  setSelected("")
  props.setSortenable(false)
  }
  return (
    <div className='mainbody'>
       <div className='searchbar'>
       <div className='positionsearch'><input type="text" placeholder="Search here" value={selected ? selected : searchitem} onChange={(e)=>setSearchitem(e.target.value)}></input>
        <img src="https://cdn-icons-png.flaticon.com/128/3287/3287210.png" alt="search"  className="searchimage" onClick={search}></img></div>
        {searchdata.filter((item)=>{
            const data=item.toLowerCase();
            const inputdata=searchitem.toLowerCase();
            return inputdata && data.startsWith(inputdata)
        }).map((item)=><p className='options' key={item} onClick={()=>setSelected(item)}>{item}</p>)}
        </div>
    </div>
  )
}

export default Searchbar