import React, { useEffect, useState } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { addToCart } from '../api/fetch';



const Products = props => {
  const { products } = props;
  const [searchPhrase, setSearchPhrase] = useState('');
  let productSearchFilter = products.filter(product =>
    product.name.toLowerCase().includes(searchPhrase.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchPhrase.toLowerCase()) ||
    product.tag.toLowerCase().includes(searchPhrase.toLowerCase())
  );

  return (
    <div className='productPage'>
      <div className='search-products'>
        <h3>Search Products</h3>
        <input value={searchPhrase} onChange={ev => setSearchPhrase(ev.target.value)} />
      </div>
      <div className="products-container">
        {productSearchFilter.map(product => {
          return (
            <div key={product.id} className="product-info">
              <Link to={`/products/${product.id}`}>
                <img src={product.image} />
              </Link>
              <div>
                <p>
                  {product.brand} {product.name}
                </p>
                <p>
                  Type: {product.tag}
                </p>
                <p>
                  Price: ${product.price}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
