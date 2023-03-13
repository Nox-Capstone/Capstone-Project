import React, { useEffect, useState } from 'react';
import { addToCart } from '../api/fetch';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
const AddToCart = props => {
  const { product, cartId, setCart } = props;
  const [quantity, setQuantity] = useState(1);
  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const updatedCart = await addToCart({
        token,
        productId: product.id,
        cartId,
        quantity
      });
      setCart(updatedCart);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="add-to-card">
        <p>Quantity:</p>
        <button
          className="qty-btn"
          onClick={ev => {
            ev.preventDefault();
            quantity - 1 > 0 ? setQuantity(quantity - 1) : null;
          }}
        >
          <AiFillMinusCircle />
        </button>
        <input type="number" value={quantity} disabled={true} />
        <button
          className="qty-btn"
          onClick={ev => {
            ev.preventDefault();
            quantity + 1 <= product.stock ? setQuantity(quantity + 1) : null;
          }}
        >
          <AiFillPlusCircle />
        </button>
      </div>
      <div className="add-btn">
        <button className="add-btn" onClick={handleSubmit}>
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default AddToCart;
