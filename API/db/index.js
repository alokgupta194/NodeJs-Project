const mysql=require('mysql')
const util=require('util')
const config=require('../../config/index')

const db={
    createConnection:()=>{
        const connection=mysql.createConnection({
            host:"localhost",
            user:"root",
            password:"root",
            database:"employeemanagementsystem",
            port:3306
        })
        return {
            query: (sql, args) => {
                return util.promisify(connection.query).call(connection, sql, args);              
              },
              close: () => {
                return util.promisify(connection.end).call(connection);
              },
              beginTransaction: () => {
                return util.promisify(connection.beginTransaction).call(connection);
              },
              commit: () => {
                return util.promisify(connection.commit).call(connection);
              },
              rollback: () => {
                return util.promisify(connection.rollback).call(connection);
              },
        }
        connection.connect((err)=>{
            if(!err){
                console.log("database connected succesfully")
            }else{
                console.log("failed to connected")
            }
        });
    }
}

module.exports=db;