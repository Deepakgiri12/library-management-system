const express=require('express');
const app=express();

const dotenv=require('dotenv');

//import database connection filr
const Dbconnection=require('./databaseConnection');

const usersRouter=require("./Routes/users");
const booksRouter=require("./Routes/books");
dotenv.config();
const port=8081;

Dbconnection();

app.use(express.json());

app.use('/users',usersRouter);
app.use('/books',booksRouter);
// const users=require('./data/users.json');

app.get('/',(req,res)=>{
    res.status(200).json({
        message:"home page:-)"
    })
})


 
 


app.listen(port,()=>{
    console.log(`server is up and running on http://localhost:${port}`)
})