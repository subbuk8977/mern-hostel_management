

const express=require("express")
const app=express()
const mongoose=require("mongoose")
const cors=require("cors")
const bodyParser=require("body-parser")
const Hosteldataroute=require("./routes/Addhostel")
const Authroute=require("./routes/Auth")
const Fetchroute=require("./routes/Fetchhostel")
const Bookingroute=require("./routes/BookingRoute")
const ReviewsRoute=require("./routes/ReviewRoute")
port=8000

app.use(express.json({ limit: '10mb' }));
app.use(cors(
    // {
    //     origin:["https://mern-hostel-management-frontend.vercel.app/"],
    //     methods:["POST","GET"],
    //     credentials:true
    // }
))

app.get("/",(req,res)=>{
    res.json("Hello");
})

app.use("/",Hosteldataroute)
app.use("/",Authroute)
app.use("/",Fetchroute)
app.use("/",Bookingroute)
app.use("/",ReviewsRoute)



mongoose.connect(
  "mongodb://venkatasubbaiahkummari03:etIi9zGMYiV5Ecz9@ac-4g9djmh-shard-00-00.bxmp0ae.mongodb.net:27017,ac-4g9djmh-shard-00-01.bxmp0ae.mongodb.net:27017,ac-4g9djmh-shard-00-02.bxmp0ae.mongodb.net:27017/BLOGS?ssl=true&replicaSet=atlas-awe1kj-shard-0&authSource=admin&appName=shelby"
)
.then(() => {
  console.log("✅ Connected to Database");
})
.catch((err) => {
  console.error("❌ DB Error:", err);
});
app.listen(port,(req,res)=>{
    console.log("Server Started Successfully");
})
