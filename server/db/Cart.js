const client = require('./client');

const createCart = async (userId) => {
    try {
        const cart = await client.query(`
        INSERT INTO cart("userId")
        VALUES($1)
        RETURNING *
        `, [userId])
        return cart;
    } catch (err) {
        throw err;
    }
}

const getCartByUserId = async (userId) => {
    try {
        const { rows: [cart] } = await client.query(`
        SELECT *
        FROM cart
        WHERE "userId" = $1
        `, [userId])
        
        const productsResponse = await client.query(`
        SELECT *
        FROM cart_products
        LEFT JOIN products ON cart_products."productsId" = products.id
        WHERE cart_products."cartId" = $1
        `[cart.id])
        console.log(cart,'cart in db cart')
        cart.products = productsResponse.rows;
        return cart;
        return cart;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    createCart,
    getCartByUserId
}