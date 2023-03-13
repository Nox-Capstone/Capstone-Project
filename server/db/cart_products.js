const { getCartByCartId } = require('./Cart');
const client = require('./client');

const addProductToCart = async ({
    productsId,
    cartId,
    quantity = 1,
}) => {
    try {
        const checkCart = await client.query(`
            SELECT *
            FROM cart_products
            WHERE "cartId" = $2 AND "productsId" = $1
        `, [productsId, cartId])
      if (checkCart.rows.length) {
            await client.query(`
            UPDATE cart_products
            SET quantity =  $3
            WHERE "cartId" = $2 AND "productsId" = $1 
            `, [productsId, cartId, quantity])
            const cart = await getCartByCartId(cartId)
            return cart;
        }
        else {
            await client.query(`
            INSERT INTO cart_products("productsId","cartId", quantity)
            VALUES($1,$2,$3)
            ON CONFLICT ("cartId","productsId") DO NOTHING
            RETURNING *
        `, [productsId, cartId, quantity])
            const cart = await getCartByCartId(cartId)
            return cart;
        }
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

const getCartProductByCart = async (cartId) => {
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

const deleteProductFromCart = async ({
    productsId,
    cartId
}) => {
    await client.query(`
        DELETE FROM cart_products
        WHERE "productsId" = $1 AND "cartId" = $2
    `, [productsId, cartId]);
}

const deleteCartProducts = async (cartId) => {
    try {
        const { rows: [cart] } = await client.query(`
        DELETE 
        FROM cart_products
        WHERE "cartId" = $1 AND is_active = true
        RETURNING *
        `, [cartId]);
        return cart;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    addProductToCart,
    deleteProductFromCart,
    getCartProductsById,
    getCartProductByCart,
    updateCartProduct,
    deleteCartProducts
}