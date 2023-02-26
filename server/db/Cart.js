const client = require('./client');

const createCart = async (userId) =>{
    try{
        const cart = await client.query(`
        INSERT INTO cart
        VALUES($1)
        RETURNING *
        `,[userId])
        return cart;
    }catch(err){
        throw err;
    }
}

const getCartByUserId = async(userId)=>{
    try{
        const {rows:[cart]} = await client.query(`
        SELECT *
        FROM cart
        WHERE "userId" = $1
        `,[id])
        return cart;
    }catch(err){
        throw err;
    }
}

module.exports = {
    createCart,
    getCartByUserId
}