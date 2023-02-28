const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { getAllProducts } = require("../db/Products");

//This is api/products
router.get('/', async (req, res, next) => {
    const products = await getAllProducts();
    try {
    if(products){
        res.send(products)
    }else{
        next({
            name:'getProductsError',
            message: 'Failed to retrieve products'
        })
    }
    } catch (err) {
        next(err);
    }
})

module.exports = router;