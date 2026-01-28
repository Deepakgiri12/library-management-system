const mongoose=require('mongoose');

function Dbconnection(){
    const DB_URL=process.env.MONGO_URL;

    mongoose.connect(DB_URL);
    const db=mongoose.connection;

    db.on("error",console.error.bind(console,"connection error"));
    db.on("open",function(){
        console.log("db connected...")
    })
}
module.exports=Dbconnection;