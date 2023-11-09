const User = require("../../../model/userModel")

exports.getUsers = async(req,res)=>{
    const userId = req.user.id
    const users = await User.find({_id : {$ne : userId}}).select(["+otp","+isOtpVerified","-__v"])
    if(users.length > 1){
       return res.status(200).json({
            message : "Users fetched successfully",
            data  : users
        })
    }
        res.status(404).json({
            message : "User Collection is empty",
            data  : []
        })
    
 
}