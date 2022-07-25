const express=require('express');
const bodyParser = require('body-parser');
const db=require('../db/index')

const router=express.Router();


router.use(bodyParser.json());

router.get('/',(req,res)=>{  
    res.send("hello from user listing page")
})
router.get("/roleWiseUsers", async (req, res) => {
    async function roleWiseUsers() {
        const { query, close } = db.createConnection();
        try {
            let sql = `SELECT name,roles.role from  users
            join roles on
            users.roleID=roles.roleID`;
            const result = await query(sql);
            res.send(result);
        } catch (error) {
            return res.send({ "status": "Failed", "message": error.sqlMessage })
        } finally {
            await close();
        }
    }
    await roleWiseUsers();
});
router.get("/departmentWiseUsers", async (req, res) => {
    async function departmentWiseUsers() {
        const { query, close } = db.createConnection();
        try {
            let sql = `SELECT name,department.departmentName from  users
            join department on
            users.depID=department.deptID`;
            const result = await query(sql);
            res.send(result);
        } catch (error) {
            return res.send({ "status": "Failed", "message": error.sqlMessage })
        } finally {
            await close();
        }
    }
    await departmentWiseUsers();
});


module.exports={
    router
}