const Product = require("../../../model/productModel")

exports.createProduct = async(req,res)=>{
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
        productStatus
    })
    res.status(200).json({
        message : "product created sucessfully"
    })
}