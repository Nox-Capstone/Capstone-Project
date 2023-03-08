const client = require('./client');

const addProductToCart = async ({
    productsId,
    cartId,
    quantity
}) => {
    try {
        const checkCart = await client.query(`
            SELECT *
            FROM cart_products
            WHERE "cartId" = $2 AND "productsId" = $1
        `,[cartId, productsId])
        if(checkCart.length){
            await client.query(`
            UPDATE cart_products
            SET quantity = quantity + 1
            WHERE "cartId" = $2 AND "productsId" = $1
            `,[cartId, productsId])
        }
        const { rows: [cartProduct] } = await client.query(`
        INSERT INTO cart_products("productsId","cartId",quantity)
        VALUES($1,$2,$3)
        RETURNING *
        `, [productsId, cartId, quantity])
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

const deleteCartProducts = async (cartId) => {
    try {
        const { rows: [cart] } = await client.query(`
        DELETE 
        FROM cart_products
        WHERE "cartId" = $1
        RETURNING *
        `, [cartId]);
        return cart;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    addProductToCart,
    getCartProductsById,
    getCartProductByCart,
    updateCartProduct,
    deleteCartProducts
}