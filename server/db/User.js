const client = require('./client');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT;
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

// REMINDER TO ADD UPDATE, AND DELETE USERS

const createUser = async ({ username, password }) => {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  const SQL = `
    INSERT INTO users(username, password)
    VALUES($1, $2) RETURNING *
  `;
  const response = await client.query(SQL, [username, hashedPassword]);
  return response.rows[0];
}

const getUserByToken = async (token) => {
  const payload = await jwt.verify(token, JWT);
  const SQL = `
    SELECT users.*
    FROM users
    WHERE id = $1 
  `;
  const response = await client.query(SQL, [payload.id]);
  if (!response.rows.length) {
    const error = Error('not authorized');
    error.status = 401;
    throw error;
  }
  const user = response.rows[0];
  delete user.password;
  return user;
}

const getUserByUsername = async (username) => {
  try {
    const { rows: [user] } = await client.query(`
  SELECT * FROM users
  WHERE username = $1
  `, [username]);
    return user;
  } catch (err) {
    throw err;
  }
}

const getUser = async ({ username, password }) => {
  try {
    const user = await getUserByUsername(username);
    const hashedPassword = user.password;
    const isValid = await bcrypt.compare(password, hashedPassword);
    if (isValid) {
      delete user.password;
      return user;
    }
  } catch (err) {
    throw err;
  }
}

const updateUsers = async (id, ...fields) => {
  const setString = Object.keys(fields).map(
    (key, index) => `"${key}"=$${index + 1}`
  ).join(', ');
  // console.log(setString)
  try {
    const { rows: [updatedUser] } = await client.query(`
    UPDATE users
    SET ${setString}
    WHERE id=${id}
    RETURNING *;
    `, Object.values(fields));
    return updatedUser;
  } catch (err) {
    throw err;
  }
}

async function thanosSnapUser(id) {
  try {
    const { rows: [deleteUser] } = await client.query(`
    DELETE
    FROM users
    WHERE id=$1
    RETURNING *
    `, [id]);
    return deleteUser;
  } catch (err) {
    throw err;
  }
}

const getUserById = async (id) => {
  try {
    const { rows: [user] } = await client.query(`
    SELECT id, username
    FROM users
    WHERE id = $1
    `, [id]);
    return user;
  } catch (err) {
    throw err;
  }
}

const getAllUsers = async () => {
  try {
    const { rows } = await client.query(`
    SELECT *
    FROM users
    `)
    return rows;
  } catch (err) {
    throw (err)
  }
}


const authenticate = async ({ username, password }) => {
  const SQL = `
    SELECT id
    FROM users
    WHERE username = $1 and password = $2
  `;
  const response = await client.query(SQL, [username, password]);
  console.log(response);
  if (!response.rows.length) {
    const error = Error('not authorized');
    error.status = 401;
    throw error;
  }
  return jwt.sign({ id: response.rows[0].id }, JWT);
}

//Update and Delete functions for Tier II requirements

module.exports = {
  createUser,
  authenticate,
  getUserByToken,
  getUserByUsername,
  getUser,
  getUserById,
  getAllUsers,
  updateUsers,
  thanosSnapUser,

};

