const express = require("express");
const bodyParser = require("body-parser");
const db = require("../db/index");
const jwt = require("jsonwebtoken");

const authentication = require("../../middleware/authenticateRoute");
const router = express.Router();

router.use(bodyParser.json());

router.post(
  "/adminCreateRoles",
  authentication.authentication,
  async (req, res) => {
    const { roleID, role } = req.body;
    if(isNaN(roleID)){
        res.send("please enter proper roleID")
      }else if(!isNaN(role)){
        res.send("please enter proper role Name")
      }else{
        async function adminCreateRoles() {
            const { query, close } = db.createConnection();
            try {
              let sql = `INSERT INTO roles(role,roleID) VALUES ('${role}',${roleID}) `;
      
              const result = await query(sql);
      
              res.send("Record Added");
            } catch (error) {
              return res.send({ status: "Failed", message: error.sqlMessage });
            } finally {
              await close();
            }
          }
          await adminCreateRoles();
      }
  }
);
router.delete(
  "/deleteRole",
  authentication.authentication,
  async (req, res) => {
    const { id } = req.body;
    if(isNaN(id)){
        res.send("please enter proper role ID")
      }else{
        async function deleteRoleData() {
            const { query, close } = db.createConnection();
            try {
              let sql = ` DELETE FROM roles WHERE roleID=${id}`;
              const result = await query(sql);
              console.log("result in delete", result.affectedRows);
      
              if (result.affectedRows) {
                return res.send("Record Deleted");
              } else {
                return res.send({ message: "roleID not found plz check ID" });
              }
            } catch (error) {
              return res.send({ status: "Failed", message: error.sqlMessage });
            } finally {
              await close();
            }
          }
          await deleteRoleData();
      }
    
  }
);

router.put("/updateRole", authentication.authentication, async (req, res) => {
  const { roleID, role } = req.body;
  if(isNaN(roleID)){
    res.send("please enter proper Role ID")
  }else if(!isNaN(role)){
    res.send("please enter proper Role Name")
  }else{
    async function updateRole() {
        const { query, close } = db.createConnection();
        try {
          let sql = ` UPDATE roles SET role = '${role}' WHERE roleID=${roleID}`;
          const result = await query(sql);
          if (result.affectedRows) {
            res.send("role updated");
          } else {
            res.send({
              status: "Failed",
              message: "please check ROLE ID",
            });
          }
        } catch (error) {
          return res.send({ status: "Failed", message: error.sqlMessage });
        } finally {
          await close();
        }
      }
      await updateRole();
  }
});

module.exports = {
  router,
};
