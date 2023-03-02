const express = require("express");
const { getCartByUserId, createCart } = require("../db/Cart");
const { getUserByUsername } = require("../db/User");
const router = express.Router();
const jwt = require("jsonwebtoken");

//This is api/cart
router.get('/', async (req, res, next) => {
    const {userId} = req.body;
    try {
        const cart = await getCartByUserId(userId);
        res.send(cart)
    } catch (err) {
        next(err);
    }
})

//api/cart POST method untested
router.post('/', async (req, res, next) => {
    const {productId} = req.body;
    const token = req.header('Authorization');
    try {
        if(!token){
            res.send({
                error: "No token",
                message: "You must be logged in"
            })
        }
        const newToken = token.slice(7);
        const verifyToken = jwt.verify(newToken, process.env.JWT_SECRET);
        const user = await getUserByUsername(verifyToken.username);
        const newCart = await createCart({userId: user.id}); 
        console.log("Cart Created", newCart)
        res.send(newCart);

    } catch (err) {
        next(err)
    }
})

module.exports = router;