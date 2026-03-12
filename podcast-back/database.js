//username - shreyabagale_db_user
//pass - k21qMeS9LKBWE3cz
//url - mongodb+srv://shreyabagale_db_user:k21qMeS9LKBWE3cz@podcast-cluster.p2pbydd.mongodb.net/?appName=Podcast-Cluster

const mongoose=require("mongoose");
const dbConnect=async()=>{
    await mongoose.connect("mongodb+srv://shreyabagale_db_user:k21qMeS9LKBWE3cz@podcast-cluster.p2pbydd.mongodb.net/?appName=Podcast-Cluster")
    .then(()=>{
        console.log("database connected successfully");
        
    })
    .catch((err)=>{
        console.log(err);
        
    });
}
module.exports=dbConnect;