const jwt=require('jsonwebtoken')

const config=require('../../config/index');
const authService={};

authService.createToken=async(data)=>{
    try{
        const token=jwt.sign(data,config.privateKey,{expiresIn:'600m'});
        return token
    }catch(err){
        console.log(err);
    }
}

module.exports=authService;