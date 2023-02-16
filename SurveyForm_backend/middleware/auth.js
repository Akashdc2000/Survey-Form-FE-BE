const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const bcrypt=require('bcrypt')

//For Token Generation
async function generateToken(request) {
    const { email, password } = request.body;
    const hashPassword=await bcrypt.hash(password,10);
    const user={
        "email":email,
        "password":hashPassword
    }

    var privateKey = fs.readFileSync(path.join(__dirname, '/PrivateKey.key')); //private key
    var token = await jwt.sign(user, privateKey, { algorithm: 'RS512' });
    return token;
}

//For Authorization
const auth = async (request, response, next) => {

    var privateKey = fs.readFileSync(path.join(__dirname, '/PrivateKey.key')); 
    var token=request.headers.authorization
    console.log(token)
    try {
        const result=await jwt.verify(token,privateKey) 
        request.user=result;
        next() 
    } catch (error) {
        console.log("error1")
        response.status(401).json({message:"You are not authorized..."})
    }
    
}


module.exports = {
    generateToken,auth
}

