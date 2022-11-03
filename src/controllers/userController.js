const userModel = require("../models/userModel.js")
const jwt = require("jsonwebtoken")
const jwtAuthz = require("express-jwt-authz")




//===========================  Creating a user  ========================//

const createUser = async function(req,res){
    try{
        let body = req.body
        let {name, email, password} = body

        if(!name) return res.status(400).send({status: false, message: "Name is mandatory!"})
        
        if(!email) return res.status(400).send({status: false, message: "Email is mandatory!"})

        if(!password) return res.status(400).send({status: false, message: "Password is mandatory!"})

        let data = await userModel.create(body)
        res.status(201).send({status: true, message: "User successfully created!", data: data})
    }catch(error){
        res.status(500).send({status: false, message: error.message})
    }
};







const loginUser = async function(req, res){
    try{
        let body = req.body
        let token = req.header("Authorization","Bearer Token")
        let {email, password} = body

        if(!email) return res.status(400).send({status: false, message: "Email is mandatory!"})
        let existingEmail = await userModel.findOne({email: email})
        if(!existingEmail) return res.status(404).send({status: false, message: "User not found!"})

        if(!password) return res.status(400).send({status: false, message: "Password is required!"})
        if(!token){
        if(password !== existingEmail.password){
            return res.status(401).send({status: false, message: "Wrong password!"})
        }else{
            let token = jwt.sign(
                {
                    userId: existingEmail._id.toString(),
                    project: "Auth0",
                    iat: Math.floor(Date.now() / 1000),
                    exp: Math.floor(Date.now() / 1000) + 480 * 60 * 60
                },
                "Auth0"             
            )
    
            res.status(200).send({status: true, message: "User logged in successfully!", data: {userId: existingEmail._id, token: token}})
        }
        }else{
            let splittoken = token.split(" ")
            let newToken = jwt.decode(splittoken[1],"Auth0")
            newToken.exp = Date.now()
            console.log(newToken)
            return res.status(200).send({status: true, message: "User logged out successfully!"})
        }
    }catch(error){
        res.status(500).send({status: false, message: error.message})
    }
};








//================================  Fetch details of the user  ===================================//

const getUser = async function (req, res){
    try{
        let userId = req.params.userId

        let data = await userModel.findOne({_id: userId})
        res.status(200).send({status: true, data: data})
    }catch(error){
        res.status(500).send({status: false, message: error.message})
    }
};













//==============================  logout user  =========================//

const logoutUser = async function(req, res){
    try{
        let token = req.header("Authorization","Bearer Token")
        console.log(token)

    if(!token)return res.status(401).send({status:false, message:"Please enter token in bearer token"});
    let splittoken = token.split(" ")
    console.log(splittoken)
    
    //    let latest = jwt.verify(splittoken[1],"Auth0")
    }catch(error){
        res.status.send(500).send({status: false, message: error.message})
    }
};

module.exports = {createUser, loginUser, getUser, logoutUser}