import React from 'react';
import { Link, useParams } from 'react-router-dom';
import AddToCart from './AddToCart';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';
const ProductView = props => {
  const products = props.products;
  const id = useParams().productId;
  const { cart, setCart } = props;
  const product = products.find(product => product.id === parseInt(id));
  if (!product) {
    return null;
  }
  return (
    <div>
      {
        <h3>
          <Link to={'/products'}>
            {' '}<BsFillArrowLeftSquareFill />{' '}
          </Link>
        </h3>
      }
      <div className="details-styles">
        <img src={product.image} />
        <div className="productInfo">
          <h2>
            {product.brand} {product.name}
          </h2>
          <p>
            Price: ${product.price}
          </p>
          <p>
            Description: {product.description}
          </p>
          <p>
            Product Type: {product.tag}
          </p>
          <p>
            Stock: {product.stock}
          </p>
          <div>
            <AddToCart product={product} cartId={cart.id} setCart={setCart} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
