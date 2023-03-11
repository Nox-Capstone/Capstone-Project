import React, { useEffect, useState } from 'react';
import { addToCart } from '../api/fetch';

const AddToCart = (props) => {
    const { productId, cartId, setCart } = props
    const [quantity, setQuantity] = useState(1);

    const handleSubmit = async () => {
        try {
            const updatedCart = await addToCart({ productId, cartId, quantity })
            setCart(updatedCart)
        } catch (error) {
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
                onChange={(ev) => setQuantity(ev.target.value)}
            >
            </input>
            <button onClick={handleSubmit}>Add to cart</button>
        </div>
    )
}

export default AddToCart;
