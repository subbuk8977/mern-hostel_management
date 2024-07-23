const mongoose=require("mongoose")
const Userschema=new mongoose.Schema({
   username:{type:String,required:true},
   email:{type:String,required:true},
   password:{type:String,required:true},
   isadmin:{type:Boolean,default:false},
   contactno:{type:Number},
   Age:{type:Number},
   Gender:{type:String},
   Address:{type:String},
   Place:{type:String},
   Status:{type:String},
   workplace:{type:String},
   image:{type:String}
},{timestamps:true})
module.exports=mongoose.model("User",Userschema)