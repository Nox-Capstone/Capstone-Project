const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { getAllProducts } = require("../db/Products");

router.get('/', async (req, res, next) => {
    try {
        const products = await getAllProducts();
        res.send(products);
    } catch (err) {
        next(err);
    }
})

module.exports = router;