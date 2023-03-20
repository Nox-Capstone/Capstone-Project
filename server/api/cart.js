const express = require("express");
const { getCartByUserId, createCart, checkoutCart } = require("../db/Cart");
const { getUserById, getUserByToken } = require("../db/User");
const router = express.Router();
const jwt = require("jsonwebtoken");

//This is api/cart
router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const cart = await getCartByUserId(id);
        res.send(cart)
    } catch (err) {
        next(err);
    }
})

//api/cart POST method
router.post('/', async (req, res, next) => {
    const { userId } = req.body;
    const token = req.header('Authorization');
    try {
        if (!token) {
            res.send({
                error: "No token",
                message: "You must be logged in"
            })
        }
        const newCart = await createCart(userId);
        res.send(newCart);
    } catch (err) {
        next(err)
    }
})

router.post('/checkout', async (req, res, next) => {
    const user = await getUserByToken(req.headers.authorization);
    const cart = await getCartByUserId(user.id);
    const newCart = await checkoutCart(cart.id, user.id);
    res.send(newCart);
})


module.exports = router;