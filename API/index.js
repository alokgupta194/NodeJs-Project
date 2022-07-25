const express=require('express');
const userController=require('./controller/routes');

const user=express();
user.use("/user",userController.router);


module.exports=user;