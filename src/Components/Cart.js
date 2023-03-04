import React, { useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';

const Cart = (props) => {
    const { user } = props;
    return (
        <h1>{user.username ? user.username : "Guest"}'s Cart</h1>
    )
}

export default Cart;