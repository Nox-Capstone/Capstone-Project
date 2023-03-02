const express = require("express");
const apiRouter = express.Router();

const usersRouter = require('./users')
const productsRouter = require('./products')
const cartRouter = require('./cart')


apiRouter.use('/users', usersRouter);
apiRouter.use('/products', productsRouter);
apiRouter.use('/cart', cartRouter);

module.exports = apiRouter;