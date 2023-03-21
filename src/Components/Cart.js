import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { addToCart, deleteCartProduct } from "../api/fetch";

const Cart = (props) => {
  const { user, cart, setCart } = props;
  const token = window.localStorage.getItem("token")
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0)
  const navigate = useNavigate();

  useEffect(() => {
    let sum = 0;
    if (cart && cart.products) {
      //For-of loop pretty interesting to read about. Basically provides an easier way to loop over iterable objects
      //without using counter variables or index.
      for (const product of cart.products) {
        for (let i = 0; i < product.quantity; i++) {
          sum += product.price;
        }
      }
    }
    setTotal(sum);
  }, [cart])

  if (!cart.products || !user) {
    return null;
  }
  return (
    <div>
      {
        cart.products.length ? <div>
          <div className="cart-page">
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
                    <div className="cart-item">
                      {product.name} ({product.quantity})
                      <img className='cart-img' src={product.image} />
                      <div className="cart-edit">
                        <div cart-select>
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
                        </div>
                        <button onClick={async () => {
                          const newCart = await addToCart({ token, productId: product.id, cartId: cart.id, quantity })
                          setCart(newCart)
                        }}>Update Cart
                        </button>
                        <button
                          onClick={async () => {
                            const updatedCart = await deleteCartProduct(product.id);
                            setCart(updatedCart);
                          }}>
                          Remove Item
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="toCheckout">
              <p className="total">Total: ${total}</p>
              <button onClick={() => {
                navigate('/checkout')
              }}>Continue to Checkout</button>
            </div>
          </div>
        </div>
          :
          <div className="no-item-cart">
            <h2>There are no items in your cart</h2>
            <h2>continue shopping to see items here</h2>
            <Link to={'/products'}><span className="clickMe">Click here</span> to continue shopping</Link>
          </div>
      }
    </div>
  );
};

export default Cart;
