const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { getAllProducts, getProductById, updateProducts, deleteProducts, createProduct } = require("../db/Products");

//This is api/products
router.get('/', async (req, res, next) => {
    const products = await getAllProducts();
    try {
        if (products) {
            res.send(products)
        } else {
            next({
                name: 'getProductsError',
                message: 'Failed to retrieve products'
            })
        }
    } catch (err) {
        next(err);
    }
})

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    const product = await getProductById(id)
    try {
        if (product) {
            res.send(product)
        } else {
            next({
                name: 'getProductsError',
                message: 'Failed to retrieve product'
            })
        }
    } catch (error) {
        next(error);
    }
})

//To add new product to database
router.post('/', async (req, res, next) => {
    const {name, description, price, stock, brand, tag, image} = req.body;
    const token = req.header('Authorization');
    try {
        if (!token) {
            res.send({
                error: "No token",
                message: "You must be logged in"
            })
        }
        const newProduct = await createProduct({name, description, price, stock, brand, tag, image})
        res.send(newProduct);

    } catch (err) {
        next(err);
    }
})

//To update product api/products/:id
router.patch('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { name, description, price, stock, brand, tag, image } = req.body;
    try {
        if (!req.params || !req.body) {
            res.send({
                name: 'updateFailed',
                message: 'Failed to update product'
            });
        } else {
            const update = await updateProducts({ id, name, description, price, stock, brand, tag, image })
            res.send(update);
        }
    } catch (err) {
        console.error(err)
        next(err)
    }

});

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        if (!req.params || !req.body) {
            res.send({
                name: 'updateFailed',
                message: 'Failed to update product'
            });
        } else {
            await deleteProducts(id);
            res.sendStatus(200)
        }
    } catch (err) {
        console.error(err)
        next(err)
    }
})

module.exports = router;