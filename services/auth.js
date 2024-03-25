const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const encryptPassword = async (password)=>{
    try{
        const hashedPassword = await bcrypt.hash(password,10);
        return  hashedPassword;
    }
    catch(error){
        throw new Error(error.message);
    }

}
const generateToken = async(user,secret,expiresIn)=>{
return jwt.sign({id:user.id,email:user.email},secret,{expiresIn:expiresIn})
}
module.exports = { encryptPassword ,generateToken}