import React, { useEffect, useState } from 'react';
import { addToCart } from '../api/fetch';

const AddToCart = (props) => {
    const {productId, cartId} = props
    console.log(productId, 'in addToCart')
    console.log(cartId, 'in addToCart')
    const [quantity, setQuantity] = useState(1);

    const handleSubmit = async () =>{
        try{
            const addProduct = await addToCart({ productId, cartId, quantity })
            console.log(addProduct, 'added to cart')
        }catch(error){
            console.error(error)
        }
    }

  return (
    <div>
        <label htmlFor='quantity'>Quantity: </label>
        <input 
        type="number"
        id="quantity"
        name="quantity"
        value={quantity}
        onChange={(ev)=>setQuantity(ev.target.value)}
        >
        </input>
        <button onClick={handleSubmit}>Add to cart</button>
    </div>
  )
}

export default AddToCart;
