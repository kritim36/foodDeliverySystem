const express = require("express")
const app = express()
const { connectDatabase } = require("./database/database")
const { registerUser, loginUser } = require("./controller/auth/authController")

//routes
const authRoute = require("./routes/auth/authRoute")
const productRoute = require("./routes/admin/productRoute")
const adminUserRoute = require("./routes/admin/adminUserRoute")
const userReviewRouter = require("./routes/user/userReviewRoute")
const profileRoute = require("./routes/user/profileRoute")
//routes end

//tell node to use dotenv
require("dotenv").config()

app.use(express.json())
app.use(express.urlencoded({extended : true}))

//telling nodejs to give access to upload folder
app.use(express.static("./uploads"))

//Database connection
connectDatabase(process.env.MONGO_URI)

//test api to check if server is live or not
app.get("/",(req,res)=>{
    res.status(200).json({
      message : "I am alive"
    })
})

app.use("/auth",authRoute)
app.use("/products",productRoute)
app.use("/admin",adminUserRoute)
app.use("/reviews",userReviewRouter)
app.use("/profile",profileRoute)
// /register
// /login


const PORT = process.env.PORT
//listen server
app.listen(PORT,()=>{
  console.log(`server has started at ${3000}`)
})