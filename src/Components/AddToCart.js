import React, { useEffect, useState } from 'react';
import { addToCart } from '../api/fetch';

const AddToCart = (props) => {
    const { product, cartId, setCart } = props
    const [quantity, setQuantity] = useState(1);
    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        if (!token) return
        try {
            const updatedCart = await addToCart({ token, productId: product.id, cartId, quantity })
            setCart(updatedCart)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <button onClick={(ev) => {
                ev.preventDefault()
                quantity - 1 > 0 ? setQuantity(quantity-1):null
            }
            }>-</button>
            <input
                type="number"
                value={quantity}
                disabled={true}
            >
            </input>
            <button onClick={(ev) => {
                ev.preventDefault()
                quantity + 1 <= product.stock ? setQuantity(quantity+1):null
            }
            }>+</button>
            <button onClick={handleSubmit}>Add To Cart</button>
        </div>
    )
}

export default AddToCart;
