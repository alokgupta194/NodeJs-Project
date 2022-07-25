const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const env=require('../.env')
module.exports= {
  port:process.env.port|| "",
  iss: process.env.Jwt_Iss || "",
  privateKey:process.env.Jwt_secret || "", 
  host:process.env.host|| "",
  user:process.env.user|| "",
  password:process.env.password || "",
  database:process.env.database || "",
  databasePort:process.env.databasePort || "" 
};