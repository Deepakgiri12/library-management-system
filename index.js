const express=require('express');
const app=express();
const port=8081;
app.use(express.json());
app.get('/',(req,res)=>{
    res.status(200).json({
        message:"home page:-)"
    })
})

// app.all('*',(req,res)=>{
//     res.status(500).json({
//         message:"not built yet"
//     })
// })
app.listen(port,()=>{
    console.log(`server is up and running on http://localhost:${port}`)
})