const express=require('express');
const bodyParser= require('body-parser');
const config=require('./config/index');
const routes=require('./API/index');
const app=express();
app.use('/api',routes);


const server=app.listen(config.port,(err)=>{
    if(!err){
        console.log("Your Server Is Running At : "+config.port);
    }
});
server.setTimeout(1000);