const express = require("express");
const bodyParser = require("body-parser");
const db = require("../db/index");
const jwt = require("jsonwebtoken");

const authentication = require("../../middleware/authenticateRoute");
const router = express.Router();

router.use(bodyParser.json());

router.post(
  "/adminCreateDepartment",
  authentication.authentication,
  async (req, res) => {
    const { deptID, department } = req.body;
    if (isNaN(deptID)) {
      res.send("please enter proper department ID");
    } else if (!isNaN(department)) {
      res.send("please enter proper department Name");
    } else {
      async function adminCreateDepartment() {
        const { query, close } = db.createConnection();
        try {
          let sql = `INSERT INTO department(deptID,departmentname) VALUES (${deptID},'${department}') `;

          const result = await query(sql);

          res.send("Record Added");
        } catch (error) {
          return res.send({ status: "Failed", message: error.sqlMessage });
        } finally {
          await close();
        }
      }
      await adminCreateDepartment();
    }
  }
);
router.delete(
  "/deleteDepartment",
  authentication.authentication,
  async (req, res) => {
    const { deptID } = req.body;
    if(isNaN(deptID)){
        res.send("please enter  proper DEPARTMENT ID")
      }else{
        async function deleteRoleData() {
            const { query, close } = db.createConnection();
            try {
              let sql = ` DELETE FROM department WHERE deptID='${deptID}'`;
      
              const result = await query(sql);
              console.log("result in delete", result.affectedRows);
      
              if (result.affectedRows) {
                return res.send("Record Deleted");
              } else {
                return res.send({ message: "department not found plz check ID" });
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

router.put(
  "/updateDepartment",
  authentication.authentication,
  async (req, res) => {
    const { deptID, updatedName } = req.body;
    if (isNaN(deptID)) {
      res.send("please enter proper department ID");
    } else if (!isNaN(updatedName)) {
      res.send("please enter proper updated department Name");
    }else{
        async function updateRole() {
            const { query, close } = db.createConnection();
            try {
                let sql = ` UPDATE department SET departmentName = '${updatedName}' WHERE deptID='${deptID}'`;
                const result = await query(sql);
                if (result.affectedRows) {
                    res.send("department updated");
                } else {
                    res.send({
                        status: "Failed",
                        message: "please check user department ID",
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
  }
);

module.exports = {
  router,
};
