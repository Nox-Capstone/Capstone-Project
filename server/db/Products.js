const client = require('./client');

const createProduct = async ({ name, description, price, tag, quantity }) => {
    try {
        const product = await client.query(`
        INSERT INTO products (name, description, price, tag, quantity)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `, [{ name, description, price, tag, quantity }]);
        return product;
    } catch (err) {
        throw err;
    }
}

const getAllProducts = async () => {
    try {
        const { rows } = await client.query(`
        SELECT *
        FROM products
        `);
        return rows;
    } catch (err) {
        throw err;
    }
}

const getProductById = async (id) => {
    try {
        const { rows: [product] } = await client.query(`
        SELECT *
        FROM products
        WHERE id = $1
        `, [id]);
        return product;
    } catch (err) {
        throw err;
    }
}

const getProductByTag = async (tag) => {
    try {
        const { rows: [product] } = await client.query(`
        SELECT *
        FROM products
        WHERE tag = $1
        `, [tag]);
        return product;
    } catch (err) {
        throw err;
    }
}

const getProductByName = async (name) => {
    try {
        const { rows: [product] } = await client.query(`
        SELECT *
        FROM products
        WHERE name = $1
        `, [name]);
        return product;
    } catch (err) {
        throw err;
    }
}

const updateProducts = async (id, ...fields) => {
    const setFields = Object.keys(fields).map(
        (key, index) => `"${key}"=$${index + 1}`
      ).join(', ');

    try {
        const {rows: [product]} = await client.query(`
        UPDATE products
        SET ${setFields}
        WHERE id = ${id}
        RETURNING *
        `, Object.values(fields))
        return product;
    } catch (err) {
        throw err;
    }
}

const deleteProducts = async (id) => {
    try {
        const {rows: [product]} = await client.query(`
        DELETE FROM products
        WHERE id = $1
        `[id])
        return product
    } catch (err) {
        throw err;
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    getProductByTag,
    getProductByName,
    updateProducts,
    deleteProducts
};