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
    <form>
      <div className='single-page'>
          <h3>
            <Link to={'/products'}>
              {' '}<BsFillArrowLeftSquareFill className='backArrow' />{' '}
            </Link>
          </h3>
        <div className="details-styles">
          <div className='single-image'>
            <img src={product.image} />
          </div>
          <div className="single-product-info">
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
            <div className='atcButton'>
              <AddToCart product={product} cartId={cart.id} setCart={setCart} />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProductView;
