const router=require("express").Router()
const Userdata=require("../models/User")
const ImageSchema=require("../models/image")


router.post("/signup",async(req,res)=>{
    const isExist=await Userdata.findOne({email:req.body.data.email}) 
    if(isExist)
    res.send("Already Exist User")
    else
    {
    const newuser= new Userdata(req.body.data)
    const saveduser=await newuser.save()
    res.send(saveduser)
    }
})


router.post("/login",async(req,res)=>{
    const user= await Userdata.findOne({email:req.body.data.email})
    if(user)
    {
        if(user.password===req.body.data.password)
        res.send(user)
        else
        res.send("IP")
    }
    else
    res.send("IU")
})


router.post("/update/:id",async(req,res)=>{
    const id=req.params.id
    const update=await Userdata.findByIdAndUpdate(id,req.body.updateddata)
    if(update)
    {
        const selected=await Userdata.findById(id)
        res.send(selected)
    }
    else
    res.send("failed")
})


//imagestore
router.post("/uploadimage/:id",async(req,res)=>{
const id=req.params.id
const fetcheddata=await ImageSchema.findOne({userid:id})
if(fetcheddata)
{
    const saveddata=await ImageSchema.findOneAndUpdate({userid:id},{image:req.body.data.datas})
    if(saveddata)
    {
        const senddata=await ImageSchema.findOne({userid:id})
        if(senddata)
        res.send(senddata)
        else
        res.send("Error Occured While Updating")
    }
}
else
{
const saveimage=new ImageSchema({
    userid:req.params.id,
    image:req.body.data.datas
})
const savedimage=await saveimage.save()
res.send(savedimage)
}
})


router.get("/getimage/:id",async(req,res)=>{
    const id=req.params.id
    const fetcheddata=await ImageSchema.findOne({userid:id})
    if(fetcheddata)
    res.send(fetcheddata)
    else
    res.send("Noimagesaved")
})

router.get("/alluser",async(req,res)=>{
    const alluser=await Userdata.find()
    if(alluser)
    res.send(alluser)
    else
    res.send("failed to get all user")
})


 module.exports=router