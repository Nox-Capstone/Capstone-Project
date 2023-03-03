const express = require("express");
const apiRouter = express.Router();

const usersRouter = require('./users')
const productsRouter = require('./products')
const cartRouter = require('./cart')
const cartProductRouter = require('./cart_products')


apiRouter.use('/users', usersRouter);
apiRouter.use('/products', productsRouter);
apiRouter.use('/cart', cartRouter);
apiRouter.use('/cart_products', cartProductRouter);

module.exports = apiRouter;