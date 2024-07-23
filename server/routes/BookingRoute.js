const router=require("express").Router()
const Hostel = require("../models/Hostels")
const BookingSchema=require("../models/Booking")

router.post("/addbooking",async(req,res)=>{
    const ismorethan2=await BookingSchema.find({Bookeduserid:req.body.data.Bookeduserid})
    if(ismorethan2.length >1)
    res.send("2")
    else
    {
    const newbooking=new BookingSchema(req.body.data)
    const saveddata=await newbooking.save()
    if(saveddata)
    {
    const hostel=await Hostel.findById(req.body.data.Bookedhostelid._id)
    let noroom=hostel.Availableroom-req.body.data.Noofrooms
    const updatedata=await Hostel.findByIdAndUpdate(req.body.data.Bookedhostelid._id,{Availableroom:noroom})
    if(updatedata)
    res.send(saveddata)
    }
    else
    res.send("Failed") 
    }
})



router.get("/getbooking/:id",async(req,res)=>{
const userid=req.params.id
const getbooking=await BookingSchema.find({Bookeduserid:userid})
if(getbooking)
res.send(getbooking)
else
res.send("Failed to get user")
})

router.get("/allbooking",async(req,res)=>{
    const books=await BookingSchema.find()
    if(books)
    res.send(books)
    else
    res.send("NB")
})

module.exports=router