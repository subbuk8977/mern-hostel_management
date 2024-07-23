const router=require('express').Router()
const ReviewSchema=require("../models/Reviews")
const BookingSchema=require("../models/Booking")

router.post("/checkbookeduser/:id",async(req,res)=>{
    const userid=req.params.id
    const isUserbooked=await BookingSchema.find({Bookeduserid:userid})
    if(isUserbooked)
    {
        const isExist=isUserbooked.filter((item)=>item.Bookedhostelid._id===req.body.data)
        if(isExist.length>0)
        res.send({success:"CA",isExist})
        else
        res.send("CB")
    }
    else
    res.send("CB")
})

router.post("/addreview",async(req,res)=>{
    const isExist=await ReviewSchema.findOne({hostelid:req.body.data.hostelid})
    if(isExist)
    {
        let array=isExist.reviewarray
        array.push(req.body.data.reviewarray)
        const savedata=await ReviewSchema.findOneAndUpdate({hostelid:req.body.data.hostelid},{reviewarray:array})
        if(savedata)
        res.send({success:"SS",data:savedata})
        else
        res.send("Exist But Not Add")
    }
    else
    {
        const newadata=new ReviewSchema(req.body.data)
        const savedata=await newadata.save()
        if(savedata)
        res.send({success:"NSS",data:savedata})
        else
        res.send("No New Added")
    }
})


router.get("/getreview/:id",async(req,res)=>{
    const data=await ReviewSchema.find({hostelid:req.params.id})
    if(data)
    res.send(data)
    else
    res.send("NR")
})

module.exports=router