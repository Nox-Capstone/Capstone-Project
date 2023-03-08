import React, { useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { fetchCartProductByCartId } from '../api/fetch';

const Cart = (props) => {
    const { user, cart} = props;
    
    const getCartProduct = async (id) =>{
        const cart = await fetchCartProductByCartId(id)
        return cart;
    }

    return (
        <div>
            <h1>{user.username ? user.username : "Guest"}'s Cart</h1>
            <p>Items in cart: </p>
        </div>
    )
}

export default Cart;