const express = require("express");
const { getCartByUserId } = require("../db/Cart");
const router = express.Router();
const { addProductToCart, getCartProductByCart, deleteProductFromCart } = require('../db/cart_products');
const { getUserByToken, authenticate } = require("../db/User");

router.post('/', async (req, res, next) => {
    const { productsId, cartId, quantity } = req.body;
    const token = req.headers.authorization.slice(7);
    try {
        const user = await getUserByToken(token);
        await addProductToCart({ productsId, cartId, quantity })
        const cart = await getCartByUserId(user.id)
        res.send(cart);
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
        const cartProduct = await getCartProductByCart(id);
        res.send(cartProduct);
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    const token = req.headers.authorization.slice(7);
    const user = await getUserByToken(token);
    if (!user) {
        res.status(401).send({
            error: 'Unauthorized'
        });
        return;
    }
    const cart = await getCartByUserId(user.id);
    await deleteProductFromCart({ productsId: id, cartId: cart.id });
    const updatedCart = await getCartByUserId(user.id)
    res.send(updatedCart);
});

module.exports = router;