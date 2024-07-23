const mongoose=require("mongoose")
const ImageSchema=mongoose.Schema({
    userid:String,
    image:String
})
module.exports=mongoose.model("Image",ImageSchema)