const User = require("../../model/userModel")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const sendEmail = require("../../services/sendEmail")

//register
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

//login
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

//forget password
exports.forgetPassword = async(req,res)=>{
    const {email} = req.body;
    if(!email){
     return res.status(400).json({
            message : "please provide email"
        })
    }
    //check if the email is registered or not
    const userExist = await User.find({userEmail : email})
    if(userExist.length ==0){
       return res.status(404).json({
            message : "Email is not registered"
        })
    }
    //send otp to that email
    const otp = Math.floor(1000 + Math.random() * 9000);
    userExist[0].otp = otp
    await userExist[0].save()
    await sendEmail ({
        email : email,
        subject : "Your otp for fooddelivery forgetpassword",
        message : `Your otp is ${otp} . don't share with anyone`
    })
    res.status(200).json({
        message : "OTP sent sucessfully"
    })
}