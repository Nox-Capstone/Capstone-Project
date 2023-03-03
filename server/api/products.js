const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { getAllProducts, getProductById } = require("../db/Products");

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

router.get('/id', async(req,res,next)=>{
    const {id} = req.params;
    const product = await getProductById(id)
    try{
        if(product){
            res.send(product)
        }else{
            next({
                name:'getProductsError',
                message: 'Failed to retrieve product'
            })
        }
    }catch(error){
        next(error);
    }
})

module.exports = router;