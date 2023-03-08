const express = require("express");
const router = express.Router();
const {addProductToCart, getCartProductByCart} =require('../db/cart_products')

router.post('/', async(req,res,next)=>{
    try{
        const {productsId, cartId, quantity} = req.body;
        const cartProduct = await addProductToCart({productsId, cartId, quantity})
        res.send(cartProduct);
    }catch(error){
        next(error)
    }
})

router.get('/:id', async(req,res,next)=>{
    const { id } = req.params;
    
    try{
        const cartProduct = await getCartProductByCart(id);
        res.send(cartProduct);
    }catch(error){
        next(error)
    }
})
module.exports = router;