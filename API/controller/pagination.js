const express = require("express");
const bodyParser = require("body-parser");
const db = require("../db/index");

const router = express.Router();

// router.use(bodyParser.json());

router.post("/", async (req, res) => {
  let { skip, limit } = req.body;
  if(isNaN(skip)){
    res.send("please enter proper SKIP VALUE")
  }else if(isNaN(limit)){
    res.send("please enter proper LIMIT VALUE")
  }else{
    if (!skip || skip==0) {
      skip = 1;
    }
    if (!limit || limit==0) {
      limit = 10;
    }
  
    async function getUserData() {
      const { query, close } = db.createConnection();
      try {
        let total = await query(`select count(*) as count from users`);
        let temp = Object.values(JSON.parse(JSON.stringify(total)));
        let count = temp[0].count;

        const startIndex = (skip - 1) * limit;
        const endIndex = skip * limit;
        const results = {};
        if (endIndex < count) {
          results.next = {
            skip: skip + 1,
            limit: limit,
          };
        }
  
        if (startIndex > 0) {
          results.previous = {
            skip: skip - 1,
            limit: limit,
          };
        }
        let sql = `select * from users where userID between ${startIndex} and ${endIndex};`;
        const result = await query(sql);
        res.send(result);
      } catch (error) {
          res.send(error)
        return res.send({ status: "Failed", message: error.sqlMessage });
      } finally {
        await close();
      }
    }
    await getUserData();
  }
  
});

module.exports = {
  router,
};
