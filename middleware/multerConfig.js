const multer = require ("multer")

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        //check the mimetype of the file
        const allowedFileTypes = ['image/png','image/jpg','image/jpeg']
        if(!allowedFileTypes.includes(file.mimetype)){
            cb(new Error("This filetype is not supported"))
            return
        }
        cb(null, './uploads') //cb(error,sucess)
    },
    filename : function(req,file,cb){
        cb(null,file.originalname)
    }
})

module.exports = {
    multer,
    storage
}