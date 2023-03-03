const express = require("express");
const router = express.Router();
const {addProductToCart} =require('../db/cart_products')

router.post('/', async(req,res,next)=>{
    try{
        const {productId, cartId, quantity} = req.body;
        const cartProduct = await addProductToCart({productId, cartId, quantity})
        res.send(cartProduct);
    }catch(error){
        next(error)
    }
})

module.exports = router;