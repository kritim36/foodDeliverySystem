const express = require("express")
const app = express()
const { connectDatabase } = require("./database/database")
const User = require("./model/userModel")

const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
//tell node to use dotenv
require("dotenv").config()

app.use(express.json())
app.use(express.urlencoded({extended : true}))

//Database connection
connectDatabase(process.env.MONGO_URI)

//test api to check if server is live or not
app.get("/",(req,res)=>{
    res.status(200).json({
      message : "I am alive"
    })
})

//reister user api
app.post("/register", async(req,res)=>{
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
})

//login user api
app.post("/login", async(req,res)=>{
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
})



const PORT = process.env.PORT
//listen server
app.listen(PORT,()=>{
  console.log(`server has started at ${3000}`)
})