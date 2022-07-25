const jwt=require('jsonwebtoken')

const express=require('express');
const bodyParser = require('body-parser');

const sb=require('../db/index.js');
const config=require('../../config/index');
const adminController=require('./adminUser');

const userDetailCheck=require('../../middleware/userDetailCheack');
const createJwtToken =require('../../middleware/createJwtToken');
const authentication =require('../../middleware/authenticateRoute');

const listing=require('./listing')
const pagination=require('./pagination')
const adminRole=require('./adminRoles')
const adminDepartment=require('./adminDepartment')


const db=require('../db/index')
const router=express.Router();  

router.use(bodyParser.json());
router.use('/admin',adminController.router)
router.use('/listing',listing.router)
router.use('/pagination',pagination.router)
router.use('/adminRole',adminRole.router)
router.use('/adminDepartment',adminDepartment.router)

router.get("/userlist", async (req, res) => {
    async function userlist() {
        const { query, close } = db.createConnection();
        try {
            let sql = `SELECT name,roles.role ,department.departmentName FROM users
            join roles on
            roles.roleID=users.roleID
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
    await userlist();
});


router.get('/',(req,res)=>{  
    res.send("hello from user home page")
})

router.post('/userLogin',userDetailCheck.userDetailCheck,createJwtToken.createToken,async(req,res)=>{
    token=req.token;
    const role=req.userType
    if(role==='admin'){
        res.send({"status":"sucess","message":"Admin login sucesss",token:token});
    }else if(role==='normalUser'){
        res.send({"status":"sucess","message":"Normal login sucesss"});
    }    
});
router.get("/downloadCsv", async (req, res) => {
    async function downloadCsv() {
        const { query, close } = db.createConnection();
        try {
            let sql = `SELECT * FROM users into outfile 
            "C:\\Users\\OPTLPTP254\\Downloads\\users.csv" 
            fields terminated by ',' 
            lines terminated by '\n';`;
            const result = await query(sql);
            if(result.affectedRows){
                res.send("donload sucessfull");
            }else{
                res.send({ "status": "Failed", "message": "Failed To Download" })
            }          
        } catch (error) {
            return res.send({ "status": "Failed", "message": error.sqlMessage })
        } finally {
            await close();
        }
    }
    await downloadCsv();
    });
    
    module.exports={
    router
};






// router.get("/rolelist", async (req, res) => {
//     async function rolelist() {
//         const { query, close } = db.createConnection();
//         try {
//             let sql = `SELECT role FROM roles`;
//             const result = await query(sql);
//         } catch (error) {
//             return res.send({ "status": "Failed", "message": error })
//         } finally {
//             await close();
//         }
//     }
//     await rolelist();
// });


// router.get("/departmentlist", async (req, res) => {  
//     async function departmentlist() {
//         const { query, close } = db.createConnection();
//         try {
//             let sql = `SELECT departmentName FROM department`;
//             const result = await query(sql);
//             res.send(result)
//         } catch (error) {
//             return res.send({ "status": "Failed", "message": error })
//         } finally {
//             await close();
//         }
//     }
//     await departmentlist();
// });
