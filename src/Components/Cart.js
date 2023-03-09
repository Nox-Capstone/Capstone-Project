import React, { useEffect, useState } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { fetchCartProductByCartId } from '../api/fetch';

const Cart = (props) => {
    const { user, cart } = props;
    const token = window.localStorage.getItem("token")
    console.log(props)
    const navigate = useNavigate();

    if (!user && !cart) {
        return null
    }
    return (
        <div>
            <h1>{user.username ? user.username : "Guest"}'s Cart</h1>
            <p>Items in cart: {cart.products.length? cart.products.length:0 }</p>
        </div>
    )
}

export default Cart;