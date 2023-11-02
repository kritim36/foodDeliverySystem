const mongoose = require("mongoose")
const adminSeeder = require("../adminSeeder")


exports.connectDatabase = async(URI)=>{
    // connecting to database 
// jaba samma database sanga connect hudainw wait gar
 await mongoose.connect(URI)
 //mongodb+srv://foodDelivery:<password>@cluster0.bzmqwes.mongodb.net/?retryWrites=true&w=majority
 console.log("Database connected successfully")

 //admin seeding function
adminSeeder()

}

