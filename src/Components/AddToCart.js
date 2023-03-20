import React, { useEffect, useState } from 'react';
import { addToCart } from '../api/fetch';
import toast, { Toaster } from 'react-hot-toast';
import {BiMinus, BiPlus} from 'react-icons/bi'

const AddToCart = props => {
  const { product, cartId, setCart } = props;
  const [quantity, setQuantity] = useState(1);
  const handleSubmit = async () => {
    const token = localStorage.getItem('token');

    if (!token || !cartId) {
      toast.error('Cannot Add to Cart Please login')
      return
    } else {
      try {
        const updatedCart = await addToCart({
          token,
          productId: product.id,
          cartId,
          quantity
        });
        setCart(updatedCart);
        toast.success('Item Added to Cart')
      } catch (error) {
        console.error(error);
      }
    }
  }


  return (
    <form className='atc-container'>
      <div className="add-to-card">
        <p>Quantity:</p>
        <button
          className="qty-btn"
          onClick={ev => {
            ev.preventDefault();
            quantity - 1 > 0 ? setQuantity(quantity - 1) : null;
          }}
        >
          <BiMinus />
        </button>
        <input type="number" value={quantity} disabled={true} />
        <button
          className="qty-btn"
          onClick={ev => {
            ev.preventDefault();
            quantity + 1 <= product.stock ? setQuantity(quantity + 1) : null;
          }}
        >
          <BiPlus />
        </button>
      </div>
      <div className="add-btn-div">
        <button className="add-btn" onClick={handleSubmit}>
          Add To Cart
        </button>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </div>
    </form>
  );
};

export default AddToCart;
