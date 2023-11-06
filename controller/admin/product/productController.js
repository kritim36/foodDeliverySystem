const Product = require("../../../model/productModel")

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
    await Products.create({
        productName,
        productDescription,
        productStockQty,
        productPrice,
        productStatus,
        productImage : "http://localhost:3000/" +  filePath
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