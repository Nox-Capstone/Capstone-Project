import React, { useEffect, useState } from "react";
import { purchaseCart } from "../api/fetch";
import toast, { Toaster } from 'react-hot-toast';

const CheckoutPage = (props) => {
    const { user, cart, setCart } = props;

    return (
        <form>
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
                    <div>
                        <h1>Cart Summary</h1>
                        <button
                            onClick={async () => {
                                const newCart = await purchaseCart();
                                setCart(newCart);
                                toast.success('Items Checked Out')
                            }}
                        >Checkout</button>
                        <Toaster
                            position="top-center"
                            reverseOrder={false}
                        />
                    </div>
                </div>
                <div className="checkout-right">
                            <p>this is the right side</p>
                            <p>cart info will be over here</p>
                </div>
            </div>
        </form>
    )
}

export default CheckoutPage;