const mongoose=require("mongoose")
const FavhotelSchema=mongoose.Schema({
    userid:String,
    favhotelidarray:[]
})

module.exports=mongoose.model("Favhotelofuser",FavhotelSchema)