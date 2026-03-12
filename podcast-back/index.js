console.log(1);
const express=require("express");
const cors = require("cors")
const dbConnect=require("./database");
const userRoutes = require("./Routes/userRoutes");
const podcastRoutes = require("./Routes/podcastRoutes")
const clipRoutes = require("./Routes/clipRoutes");

dbConnect();
const port=5000;
const app=express();
app.use(cors())
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("podcast clip editor backend is working")
})

app.use("/user",userRoutes);
app.use("/podcast",podcastRoutes);
app.use("/clip",clipRoutes);

app.listen(port,()=>{
    console.log(`server is listening on port ${port}`);  
})
