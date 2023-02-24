const client = require('./client');

const createCart = async ({userId, quantity}) =>{
    try{
        const {rows:[cart]} = await client.query(`
        
        `)
    }catch(err){
        throw err;
    }
}