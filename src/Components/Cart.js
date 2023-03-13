import React, { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { addToCart } from "../api/fetch";

const Cart = (props) => {
  const { user, cart, setCart, products } = props;
  const token = window.localStorage.getItem("token")
  const [quantity, setQuantity] = useState(1);
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
          const quantityArray = []
          for (let i = 1; i < product.stock + 1; i++) {
            if (i <= 10) {
              quantityArray.push(i)
            }
          }
          return (
            <li key={product.id}>
              {product.name}({product.quantity})
              <div>
                <label>qyt: </label>
                <select onChange={(ev) =>
                  setQuantity(ev.target.value)
                }>
                  {quantityArray.map(quant =>
                    <option
                      value={quant}>{quant}
                    </option>)
                  }
                </select>
                <button onClick={async () => {
                  await addToCart({ token, productId: product.id, cartId: cart.id, quantity })
                }}>Update Cart
                </button>
              </div>
              <button
                onClick={async () => {
                  await deleteCartProduct(product.id);
                }}>
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
