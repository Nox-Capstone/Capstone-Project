const express = require("express");
const apiRouter = express.Router();

const usersRouter = require('./users')
const productsRouter = require('./products')

apiRouter.use('/users', usersRouter);
apiRouter.use('/products', productsRouter);

module.exports = apiRouter;