import React, { useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { fetchCartProductByCartId } from '../api/fetch';

const Cart = (props) => {
    const { user, cart } = props;
    const token = window.localStorage.getItem("token")
    console.log(props)
    const [cartProduct, setCartProduct] = useState({});
    
    if (!user && !cart) {
        return null
    }
    const getCartProduct = async (id) =>{
        const cart = await fetchCartProductByCartId(id)
        setCartProduct(cart);
    }
    useEffect(()=>{
        getCartProduct(cart.id)
    },[token])
    return (
        <div>
            <h1>{user.username ? user.username : "Guest"}'s Cart</h1>
            <p>Items in cart: {cartProduct.length}</p>
        </div>
    )
}

export default Cart;