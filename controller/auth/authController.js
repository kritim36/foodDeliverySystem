const User = require("../../model/userModel")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.registerUser = async(req,res)=>{
    const{email,password,phoneNumber,userName} = req.body
    if(!email || !password || !phoneNumber || !userName){
     return res.status(400).json({
        message : "please provide email, password, phoneNumber"
      })
    }
    //check if that user email already exist or not
    const userFound = await User.find({userEmail : email})
    if(userFound.length >0){
      return res.status(400).json({
        message : "User with that email already exist"
      })
    }
  
    //else
    await User.create({
      userEmail : email,
      userPhoneNumber : phoneNumber,
      userName : userName,
      userPassword: bcryptjs.hashSync(password, 10)
    })
  
    res.status(201).json({
      message : "User registered sucessfully"
    })
  }

  exports.loginUser =  async(req,res)=>{
    const{email,password} = req.body
    if(!email || !password){
      return res.status(400).json({
        message : "please provide email,password"
      })
    }
  
    //check that if the email user already exist or not
    const userFound = await User.find({userEmail : email})
    if(userFound.length == 0){
      res.status(404).json({
        message : "User with that email is not registered"
      })
    }
  
    //password check
    const isMatched = bcryptjs.compareSync(password, userFound[0].userPassword)
    if(isMatched){
      //generate token
      const token = jwt.sign({id : userFound[0]._id}, process.env.SECRET_KEY,{
        expiresIn : '30d'
      })
  
      res.status(200).json({
        message: "User logged in sucessfully",
        token
      })
    }
    else{
      res.status(404).json({
        message : "Invalid Password"
      })
    }
  }