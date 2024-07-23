

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
    {
        origin:["https://mern-hostel-management-frontend.vercel.app/"],
        methods:["POST","GET"],
        credentials:true
    }
))

app.get("/",(req,res)=>{
    res.json("Hello");
})

app.use("/",Hosteldataroute)
app.use("/",Authroute)
app.use("/",Fetchroute)
app.use("/",Bookingroute)
app.use("/",ReviewsRoute)




mongoose.connect("mongodb+srv://venkatasubbaiahkummari03:4a4QgPMkw6wScaCu@shelby.bxmp0ae.mongodb.net/BLOGS?retryWrites=true&w=majority&appName=shelby").then(()=>console.log("Connected to Database"))
app.listen(port,(req,res)=>{
    console.log("Server Started Successfully")
})
