import React, { useEffect, useState } from "react";
import { purchaseCart } from "../api/fetch";
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const CheckoutPage = (props) => {
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

    if (!cart && !user) {
        return null;
    }
    return (
        <div>
            <div className="checkout-page">
                <div className="checkout-left">
                    <div className="checkout-name">
                        <input
                            placeholder="First Name"
                        />
                        <input
                            placeholder="Last Name"
                        />
                    </div>
                    <div className="address">
                        <input
                            placeholder="Street"
                        />
                        <input
                            placeholder="City"
                        />
                        <input
                            placeholder="State"
                        />
                        <input
                            placeholder="ZIP"
                        />
                    </div>
                    <div className="payment">
                        <input
                            placeholder="Card Number"
                        />
                        <input
                            placeholder="Expiration Date"
                        />
                        <input
                            placeholder="CCV"
                        />
                    </div>
                </div>
                <div className="checkout-right">
                    <div className="cart-summary">
                            <h1>Cart Summary</h1>
                        <div className="item-list">
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
                                            <div className="summary-item">
                                                {product.brand} {product.name} ({product.quantity})
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div>
                            <p>Total: ${total}</p>
                            <button
                                onClick={async () => {
                                    const newCart = await purchaseCart();
                                    setCart(newCart);
                                    toast.success('Items Checked Out')
                                    navigate('/thankYou')
                                }}
                            >Checkout</button>
                            <Toaster
                                position="top-center"
                                reverseOrder={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage;