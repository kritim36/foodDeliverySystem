const express = require("express")
const app = express()
const { connectDatabase } = require("./database/database")
const { registerUser, loginUser } = require("./controller/auth/authController")

//routes
const authRoute = require("./routes/authRoute")
//routes end

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

app.use("",authRoute)
// /register
// /login


const PORT = process.env.PORT
//listen server
app.listen(PORT,()=>{
  console.log(`server has started at ${3000}`)
})