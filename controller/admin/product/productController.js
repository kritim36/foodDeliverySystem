const Product = require("../../../model/productModel")

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
        productImage : "http://localhost:3000/" +  filePath
    })
    res.status(200).json({
        message : "product created sucessfully"
    })
}