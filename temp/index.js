const path=require("path")
const dotenv=require("dotenv")

const fileURLToPath=require("url")

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config({ path: __dirname.replace("config", "") + ".env" });

// export default {
//   privateKey: process.env.JWT_SECRET || "",
//   port: process.env.PORT || "",
//   iss: process.env.JWT_ISS || "",
//   exp: process.env.JWT_EXP || "",
//   dbHost: process.env.DB_HOST || "",
//   dbName: process.env.DB_NAME || "",
//   dbUserName: process.env.DB_USER || "",
//   dbPassWord: process.env.DB_PASSWORD || "",
 
// };

process.env.PORT=3000
console.log(process.env.PORT)