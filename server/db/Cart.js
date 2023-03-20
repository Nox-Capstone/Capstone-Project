const client = require("./client");

const createCart = async (userId) => {
  try {
    const cart = await client.query(
      `
        INSERT INTO cart("userId")
        VALUES($1)
        RETURNING *
        `,
      [userId]
    );
    return cart;
  } catch (err) {
    throw err;
  }
};

const getCartByUserId = async (userId) => {
  const {
    rows: [cart],
  } = await client.query(
    `
    SELECT *
    FROM cart
    WHERE "userId" = $1 AND "is_active" = true
    `,
    [userId]
  );
  const productsResponse = await client.query(
    `
    SELECT *
    FROM cart_products
    LEFT JOIN products ON cart_products."productsId" = products.id
    WHERE cart_products."cartId" = $1
    `,
    [cart.id]
  );
  cart.products = productsResponse.rows;
  return cart;
};

const getCartByCartId = async (id) => {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
        SELECT *
        FROM cart
        WHERE id = $1
        `,
      [id]
    );
    
    const productsResponse = await client.query(
      `
        SELECT *
        FROM cart_products
        LEFT JOIN products ON cart_products."productsId" = products.id
        WHERE cart_products."cartId" = $1
        `,
      [cart.id]
    );
    cart.products = productsResponse.rows;
    return cart;
  } catch (error) {
    throw error;
  }
};

const checkoutCart = async (cartId, userId) => {
  const {
    rows: [cart],
  } = await client.query(
    `
        UPDATE cart
        SET is_active = false
        WHERE id = $1
    `,
    [cartId]
  );
  const newCart = await createCart(userId);
  return newCart;
};

module.exports = {
  createCart,
  getCartByUserId,
  getCartByCartId,
  checkoutCart,
};
