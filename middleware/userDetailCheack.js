const db = require("../API/db/index");
const bcrypt = require("bcrypt");

// import db from "../API/db/index";
// import bcrypt from "bcrypt";

module.exports = {
  userDetailCheck: async function (req, res, next) {
    const { email, password } = req.body;
    if (email && password) {
      async function insertUserData() {
        const { query, close } = db.createConnection();
        try {
          let sql = `SELECT email,password,roles.role as userType
          FROM users
          join roles on
          users.userType=roles.roleID
          where email='${email}'`;
          const result = await query(sql);
          req.userType=result[0].userType

          if (result[0] != null) {
            const isMatch = (password) === result[0].password;
            if (email === result[0].email && isMatch) {
              req.email = email;
              req.password = password;
              next();
            } else {
              res.send({ status: "Failed", message: "Wrong password" });
            }
          } else {
            res.send({
              status: "Failed",
              message: "you are not a register user",
            });
          }
        } catch (error) {
          throw error;
        } finally {
          await close();
        }
      }
      await insertUserData();
    } else {
      return res.send({ status: "Failed", message: "All field are required" });
    }
  },
};
