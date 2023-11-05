const multer = require ("multer")

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        //check the mimetype of the file
        const allowedFileType = ['image/png','image/jpg','image/jpeg']
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