const express = require("express");
const apiRouter = express.Router();

const usersRouter = require('./users')
const productsRouter = require('./products')
const cartRouter = require('./cart')
const cartProductRouter = require('./cart_products')
// const adminRouter = require('/admin')

// Need admin js file in server/api/ ^^^


apiRouter.use('/users', usersRouter);
apiRouter.use('/products', productsRouter);
apiRouter.use('/cart', cartRouter);
apiRouter.use('/cart_products', cartProductRouter);
// apiRouter.use('/admin', adminRouter);

module.exports = apiRouter;