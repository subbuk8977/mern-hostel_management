const mongoose=require("mongoose")
const ReviewSchema=mongoose.Schema({
    hostelid:{type:String},
    reviewarray:[]
})
module.exports=mongoose.model("ReviewsofHostel",ReviewSchema)