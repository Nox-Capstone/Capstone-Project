import React, { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { addToCart, deleteCartProduct, purchaseCart } from "../api/fetch";

const Cart = (props) => {
  const { user, cart, setCart, products } = props;
  const token = window.localStorage.getItem("token")
  const [quantity, setQuantity] = useState(1);


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
                  const newCart = await addToCart({ token, productId: product.id, cartId: cart.id, quantity })
                  setCart(newCart)
                }}>Update Cart
                </button>
              </div>
              <button
                onClick={async () => {
                  const updatedCart = await deleteCartProduct(product.id);
                  setCart(updatedCart);
                }}>
                Remove Item
              </button>
            </li>
          );
        })}
      </ul>
      <button
        onClick={async ()=> {
          const newCart = await purchaseCart();
          setCart(newCart)
        }}
      >CHECKOUT</button>
      <div className="total">Total: </div>
    </div>
  );
};

export default Cart;
