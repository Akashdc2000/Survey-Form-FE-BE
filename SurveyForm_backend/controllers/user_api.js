const userModel = require('../models/users_model')

const bcrypt = require('bcrypt');
const { generateToken } = require('../middleware/auth');
const saltRounds = 10;


//Add new User
const register = async (request, response) => {
    try {
        const { firstname, lastname, email, mobile, password } = request.body;

        const existingUser = await userModel.findOne({ email: email })
        if (existingUser) {
            return response.status(200).json({ message: 'User already exists' });
        }

        const hashPassword = await bcrypt.hash(password, saltRounds);
        const result = await userModel.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            mobile: mobile,
            password: hashPassword
        })
        result.save((error, doc) => {
            if (error)
                response.send(error);
            else
                response.status(200).json({ message: 'Registration Successful..' ,data:doc})
        })


    } catch (error) {
        response.status(201).json({message:"Something went Wrong !!!!"})
    }
}


//Get all Users
const getall = async (request, response) => {
    try {
        const result = await userModel.find({});
        response.status(200).json({
            message: `Total ${result.length} Users`,
            "Users": result
        })
    } catch (error) {
        response.send(error)
    }
}


//Login 
const login = async (request, response) => {
    const { email, password } = request.body;

    const existingUser = await userModel.findOne({ email: email })
    if (!existingUser) {
        return response.status(200).json({ message: 'User Not exists' });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
        return response.status(200).json({ message: 'Invalid Credentials' });
    }
    //Generate Token
    let token= await generateToken(request);
    console.log(token)
    response.status(200).json({ message: "authorized",token:token })
}


//Update User Details

const update = async (request, response) => {
    const { firstname, lastname, email, mobile, password } = request.body;

    const hashPassword = await bcrypt.hash(password, saltRounds);

    const user = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        mobile: mobile,
        password: hashPassword
    }

    const id = request.params._id
    try {
        userModel.findByIdAndUpdate(id, user, (error, doc) => {
            if (error) response.status(404).json(error)
            if (!doc)
                response.status(404).json({ message: "User Not Present in Database...." })
            else
                response.status(200).json({
                    message: `Following User Updated Succesfully...`,
                    "User": user
                })
        });

    } catch (error) {
        response.status(404).json({ message: "User Not Present in Database...." })
    }
}

//Delete User Details
const deleteUser = async (request, response) => {

    const id = request.params._id;
    try {
        userModel.findByIdAndDelete(id, (error, doc) => {
            if (error) response.status(404).json(error)
            if (!doc)
                response.status(404).json({ message: "User Not Present in Database...." })
            else
                response.status(200).json({
                    message: `Following User Deleted Succesfully...`,
                    "User": doc
                })
        });

    } catch (error) {
        response.status(404).json({ message: "User Not Present in Database...." })
    }
}


//Get Userid by a Email

const getUserID = async (request, response) => {


    try {
        const result = await userModel.findOne({email:request.body.email});
        if(result)
            response.status(200).json({user_id:result._id})
        else
            response.status(201).json({message:"No User ID Found "})
    } catch (error) {
        response.status(200).json(error)
    }
}



module.exports = {
    getall, register, update, login, deleteUser,getUserID
}
