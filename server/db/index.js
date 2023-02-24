const client = require('./client');
const {
  getUserByToken,
  createUser,
  authenticate
} = require('./User');

const dropTables = async () => {
  const SQL = `
  DROP TABLE IF EXISTS reviews;
  DROP TABLE IF EXISTS build_products;
  DROP TABLE IF EXISTS build;
  DROP TABLE IF EXISTS cart_products;
  DROP TABLE IF EXISTS cart;
  DROP TABLE IF EXISTS products;
  DROP TABLE IF EXISTS users;
`
  await client.query(SQL);
}

const syncTables = async () => {
  const SQL = `
  CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    "isAdam" BOOLEAN default FALSE,
    image VARCHAR(255)
  );
  CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price INTEGER,
    quantity INTEGER,
    tag TEXT,
    image VARCHAR(255)
  );
  CREATE TABLE cart(
    id SERIAL PRIMARY KEY,
    "userId" INTEGER REFERENCES users(id),
    quantity INTEGER
  );
  CREATE TABLE cart_products(
    id SERIAL PRIMARY KEY,
    "cartId" INTEGER REFERENCES cart(id),
    "productsId" INTEGER REFERENCES products(id),
    quantity INTEGER,
    UNIQUE("cartId","productId")
  );
  CREATE TABLE build(
    id SERIAL PRIMARY KEY,
    "userId" INTEGER REFERENCES users(id),
    "productsId" INTEGER REFERENCES products(id),
    image VARCHAR(255)
  );
  CREATE TABLE build_products(
    id SERIAL PRIMARY KEY,
    "buildId" INTEGER REFERENCES build(id),
    "userId" INTEGER REFERENCES users(id)
  );
  CREATE TABLE reviews(
    id SERIAL PRIMARY KEY,
    "userId" INTEGER REFERENCES users(id),
    "productsId" INTEGER REFERENCES products(id)
  );
  `;
  await client.query(SQL);
};

const syncAndSeed = async () => {
  await dropTables();
  await syncTables();
  const [moe, lucy] = await Promise.all([
    createUser({
      username: 'moe',
      password: 'moe_password'
    }),
    createUser({
      username: 'lucy',
      password: 'lucy_password'
    })
  ]);
  console.log('--- seeded users ---');
  console.log(moe);
  console.log(lucy);
};


module.exports = {
  syncAndSeed,
  createUser,
  authenticate,
  getUserByToken,
  client
};
