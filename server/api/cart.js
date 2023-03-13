const express = require("express");
const { getCartByUserId, createCart } = require("../db/Cart");
const { getUserById } = require("../db/User");
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

//api/cart POST method untested
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
        const newToken = token.slice(7);
        const newCart = await createCart(userId);
       // console.log('Cart Created for user: ',userId)
        res.send(newCart);

    } catch (err) {
        next(err)
    }
})


module.exports = router;