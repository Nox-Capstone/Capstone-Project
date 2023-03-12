import React, { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";

const Cart = (props) => {
  const { user, cart, setCart, products} = props;

  const deleteCartProduct = async (productsId) => {
    const token = window.localStorage.getItem("token");
    console.log(productsId, "calling delete cart product");
    if (!token) return;
    const response = await fetch(`/api/cart_products/${productsId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const updatedCart = await response.json();
    setCart(updatedCart);
    return updatedCart;
  };

  if (!user && !cart) {
    return null;
  }
  return (
    <div>
      <h1>{user.username ? user.username : "Guest"}'s Cart</h1>
      <ul>
        {cart.products?.map((product) => {
          return (
            <li key={product.id}>
              {product.name}({product.quantity})
              <button
                onClick={async () => {
                  await deleteCartProduct(product.id);
                }}
              >
                Remove Item
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Cart;
