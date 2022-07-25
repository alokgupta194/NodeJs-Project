const express = require("express");
const validator = require("validator");
const bodyParser = require("body-parser");
const db = require("../db/index");

const authentication = require("../../middleware/authenticateRoute");
const router = express.Router();

router.use(bodyParser.json());

router.get("/", (req, res) => {
  res.send("hello from user admin page");
});

router.post(
  "/adminCreateUser",
  authentication.authentication,
  async (req, res) => {
    const { userID, name, email, password, roleID, deptID, userType } =req.body;
    async function insertUserData() {
      if(!validator.isEmail(email)){
        res.send("invalid entery  email !! please check")
      }else if(!validator.isStrongPassword(password, {minLength: 8,minLowercase: 1,minUppercase: 1,minNumbers: 1,minSymbols: 1})){
        res.send("invalid entery  password !! please check minLength: 8,minLowercase: 1,minUppercase: 1,minNumbers: 1,minSymbols: 1")
      }else if(isNaN(userID)){
        res.send("please enter proper userID")
      }else if(isNaN(roleID)){
        res.send("please enter proper roleID")
      }else if(isNaN(deptID)){
        res.send("please enter proper deptID")
      }else if(isNaN(userType)){
        res.send("please enter proper userType")
      }else if(!(isNaN(name))){
        res.send("please enter proper name")
      }else{        
        const { query, close } = db.createConnection();
        try {
          let sql0 = `INSERT INTO users VALUES (${userID}, '${name}', '${email}', '${password}', ${roleID}, ${deptID},${userType}) `;
          let sql1 = `INSERT INTO departmentUser(userID,depID) VALUES (${userID},${deptID}) `;
          let sql2 = `INSERT INTO departmentRole(userID,roleID,depID) VALUES (${userID}, ${roleID},${deptID}) `;
          let sql3 = `INSERT INTO userrole(userID,roleID) VALUES (${userID},${roleID}) `;

          const result0 = await query(sql0);
          const result1 = await query(sql1);
          const result2 = await query(sql2);
          const result3 = await query(sql3);

          res.send("Record Added");
        } catch (error) {
          return res.send({ status: "Failed", message: error.sqlMessage });
        } finally {
          await close();
        }

      }
    }
    await insertUserData();
  }
);
router.delete(
  "/deleteUser",
  authentication.authentication,
  async (req, res) => {
    const { id } = req.body;
    if(isNaN(id)){
      res.send("please enter proper user Id")
    }else{
      async function deleteUserData() {
        const { query, close } = db.createConnection();
        try {
          let sql = ` DELETE FROM users WHERE userID='${id}'`;
          const result = await query(sql);
          console.log("result in delete", result.affectedRows);
  
          if (result.affectedRows) {
            return res.send("Record Deleted");
          } else {
            return res.send({ message: "user not found plz check ID" });
          }
        } catch (error) {
          return res.send({ status: "Failed", message: error.sqlMessage });
        } finally {
          await close();
        }
      }
      await deleteUserData();
    }
  }
);

router.put("/updateUser", authentication.authentication, async (req, res) => {
  const { email, password } = req.body;
  if(!validator.isEmail(email)){
    res.send("invalid entery  email !! please check")
  }else{
    async function updateUserData() {
      const { query, close } = db.createConnection();
      try {
        let sql = ` UPDATE users SET password = '${password}' WHERE email='${email}'`;
        const result = await query(sql);
        if (result.affectedRows) {
          res.send("password updated");
        } else {
          res.send({ status: "Failed", message: "please check user email" });
        }
      } catch (error) {
        return res.send({ status: "Failed", message: error.sqlMessage });
      } finally {
        await close();
      }
    }
    await updateUserData();
  }
});
module.exports = {
  router,
};
