import React, { useEffect, useState } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { addToCart } from '../api/fetch';
const Products = props => {
  const { products } = props;
  const navigate = useNavigate();
  const Search = () => {
    return <div />;
  };
  return (
    <div>
      <h1>
        Products ({products.length})
        <input
          placeholder="search"
          className="searchbar"
          onChange={ev => navigate(`products/search/${ev.target.value}`)}
        />
      </h1>
      <div>
        <div className="products-container">
          {products.map(product => {
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
    </div>
  );
};

export default Products;
