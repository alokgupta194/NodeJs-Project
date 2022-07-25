const config = require("../config/index");
const authService = require("../API/service/authService");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// console.log(config.iss)
module.exports = {
  createToken: async function (req, res, next) {

    const {email, password} = req;
    usertype=req.userType
    const tokenPayLoad = {
      iss: config.iss,
      sub: email,
      password: password,
      usertype: usertype, 
    };
    console.log(tokenPayLoad)
    const tokenData = await authService.createToken(tokenPayLoad);
    const token = tokenData;
    req["token"] = token;
    console.log("jwt token sucess");
    next();
  },
};
