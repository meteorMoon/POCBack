import express from "express";

const app=express();

const add=(a:number,b:number)=>a+b; 

app.get('/',(req,res) => {
    return res.send("Hello World");
});

app.listen(80,()=>{
    console.log('server is running on port 80');
});