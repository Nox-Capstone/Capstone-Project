const express = require("express");
const { getCartByUserId } = require("../db/Cart");
const router = express.Router();
const {addProductToCart, getCartProductByCart, deleteProductFromCartProducts} =require('../db/cart_products');
const { getUserByToken } = require("../db/User");

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

router.delete('/:id', async (req, res, next) => {
    const { productsId } = req.params;
    const token = req.headers.authorization.slice(7);
    const user = await getUserByToken(token); 
    const cart = await getCartByUserId(user.id);
    await deleteProductFromCartProducts({productsId, cartId: cart.id});
    const updateCart = await getCartProductByCart(cart.id)
    res.send({updateCart});
});

module.exports = router;