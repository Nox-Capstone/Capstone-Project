const client = require('./client');

const addProductToCart = async ({
    productId,
    cartId,
    quantity
}) => {
    try {
        const { rows: [cartProduct] } = await client.query(`
        INSERT INTO cart_products("productId","cartId",quantity)
        VALUES($1,$2,$3)
        RETURNING *
        `, [productId, cartId, quantity])
        return cartProduct;
    } catch (err) {
        throw err;
    }
}

const getCartProductsById = async (id) => {
    try {
        const { rows: [cartProduct] } = await client.query(`
        SELECT *
        FROM cart_products
        WHERE id = $1 
        `, [id])
        return cartProduct;
    } catch (err) {
        throw err;
    }
}

const getCartProductByCart = async ({ cartId }) => {
    try {
        const { rows: [cartProduct] } = await client.query(`
        SELECT *
        FROM cart_products
        WHERE "cartId" = $1
        `, [cartId])
        return cartProduct;
    } catch (err) {
        throw err;
    }
}

const updateCartProduct = async ({ id, ...fields }) => {
    const setProducts = Object.keys(fields).map(
        (key, index) => `"${key}"=$${index + 1}`
    ).join(', ');
    try {
        const { rows: [cartProduct] } = await client.query(`
        UPDATE cart_products
        SET ${setProducts}
        WHERE id = ${id}
        RETURNING *
        `, Object.values(fields))
        return cartProduct;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    addProductToCart,
    getCartProductsById,
    getCartProductByCart,
    updateCartProduct
}