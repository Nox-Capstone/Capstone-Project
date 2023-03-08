import React, { useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { fetchCartProductByCartId } from '../api/fetch';

const Cart = (props) => {
    const { user, cart} = props;
    const [cartProduct, setCartProduct] = useState({});
    
    const getCartProduct = async (id) =>{
        const cart = await fetchCartProductByCartId(id)
        return cart;
    }

    useEffect(() => {
        setCartProduct(getCartProduct(cart.id))
    }, []);

    return (
        <div>
            <h1>{user.username ? user.username : "Guest"}'s Cart</h1>
            <p>Items in cart: {cartProduct.length}</p>
        </div>
    )
}

export default Cart;