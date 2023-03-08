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
        console.log(cart,'cart in db cart')
        return cart;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    createCart,
    getCartByUserId
}