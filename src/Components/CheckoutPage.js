import React, { useEffect, useState } from "react";
import { purchaseCart } from "../api/fetch";
import toast, { Toaster } from 'react-hot-toast';

const CheckoutPage = (props) => {
    const { user, cart, setCart } = props;

    return (
        <form>
            <div>
                <input
                    placeholder="First Name"
                />
                <input
                    placeholder="Last Name"
                />
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
        </form>
    )
}

export default CheckoutPage;