const Product = require("../../../model/productModel")
const fs = require("fs")

//create product
exports.createProduct = async(req,res)=>{
    const file = req.file
    let filePath
    if(!file){
        filePath = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ9dFmHpORm762km7LqeyM2f5khiLVhzwAepIcazWq&s"
    }else{
        filePath = req.file.filename
    }

    const{productName,productDescription,productStockQty,productPrice,productStatus} = req.body
    if(!productName || !productDescription || !productStockQty || !productPrice || !productStatus){
     return   res.status(400).json({
            message : "please provide productName,productDescription,productStockQty,productprice,productstatus"
        })
    }
    //insert into product table/collection
    await Product.create({
        productName,
        productDescription,
        productStockQty,
        productPrice,
        productStatus,
        productImage : process.env.BACKEND_URL +  filePath
    })
    res.status(200).json({
        message : "product created sucessfully"
    })
   }


// get products
exports.getProducts = async(req,res)=>{
   const products = await Product.find()
   if(products.length == 0){
    res.status(400).json({
        message : "No product found",
        products : []
    })
   }else{
    res.status(200).json({
        message : "product Fetched sucessfully",
        products
    })
   }
}


// get single product
exports.getProduct = async (req,res)=>{
    const{id} = req.params
    if(!id){
        return res.status(400).json({
            message : "Please provide id(productId)"
        })
    }

    const product = await Product.find({_id : id})
    if(product.length == 0){
        res.status(400).json({
            message : "No product found with that id",
            product : []
        })
    }else{
        res.status(200).json({
            message : "Product fetched sucessfully",
            product 
        })
    }
}

//delete product
exports.deleteProduct = async(req,res)=>{
    const{id} = req.params
    if(!id){
        return res.status(400).json({
            message : "please provide id"
        })
    }
    const oldData = await Product.findById(id)
    if(!oldData){
        return res.status(404).json({
            message : "No data found with that id"
        })
    }
 
    const oldProductImage = oldData.productImage // http://localhost:3000/1698943267271-bunImage.png"
    const lengthToCut  = process.env.BACKEND_URL.length
    const finalFilePathAfterCut = oldProductImage.slice(lengthToCut) 
         // REMOVE FILE FROM UPLOADS FOLDER
            fs.unlink("./uploads/" +  finalFilePathAfterCut,(err)=>{
                if(err){
                    console.log("error deleting file",err) 
                }else{
                    console.log("file deleted successfully")
                }
            })
    await Product.findByIdAndDelete(id)
    res.status(200).json({
        message : "Product deleted sucessfully"
    })
}

//edit product
exports.editProduct = async(req,res)=>{
   
    const{id} = req.params
    const{productName,productDescription,productStockQty,productPrice,productStatus} = req.body
    if(!productName || !productDescription || !productStockQty || !productPrice || !productStatus || !id){
     return   res.status(400).json({
            message : "please provide productName,productDescription,productStockQty,productprice,productstatus,id"
        })
    }
    const oldData = await Product.findById(id)
    if(!oldData){
      return  res.status(404).json({
            message : "No data found with that id"
        })
    }
    const oldProductImage = oldData.productImage // "http://localhost:3000/pexels-suzy-hazelwood-2536965.jpg"
    const lengthToCut  = process.env.BACKEND_URL.length
    const finalFilePathAfterCut = oldProductImage.slice(lengthToCut) // pexels-suzy-hazelwood-2536965.jpg
    if(req.file && req.file.filename){
      // Remove file from upload folder
      fs.unlink("./uploads/" +  finalFilePathAfterCut, (err)=>{
        if(err){
            console.log("error deleting file",err)
        }else{
            console.log("file deleted sucessfully")
        }
      })
    }
    const datas = await Product.findByIdAndUpdate(id,{
        productName,
        productDescription,
        productStockQty,
        productPrice,
        productStatus,
        productImage : req.file && req.file.filename ? process.env.BACKEND_URL +  req.file.filename : oldProductImage
    },{
        new : true
    })
    res.status(200).json({
        message : "Product updated sucessfully",
        datas
    })
}