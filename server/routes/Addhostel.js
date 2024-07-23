const router=require("express").Router()
const Hosteldata=require("../models/Hostels")


router.post("/addhostel",async(req,res)=>{
    console.log(req.body)
    const newdata=new Hosteldata(req.body.data)
    const saveddata=await newdata.save()
    if(saveddata)
    res.send(saveddata)
    else
    res.send("error")
})



module.exports=router