import React, { useEffect, useState } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { addToCart } from '../api/fetch'
const Products = (props) => {
    const { products } = props
    const navigate = useNavigate();
    const Search = () =>{
        return (
            <div>
                
            </div>
        )
    }
    return (
        <div>
            <h1>
                Products ({products.length})
                <input 
                placeholder='search'
                className='searchbar'
                onChange={(ev)=>navigate(`products/search/${ev.target.value}`)}/>
            </h1>
            <ul>
                {
                    products.map(product => {
                        return (
                            <li key={product.id}>
                                <Link to={`/products/${product.id}`} >{product.brand} {product.name}</Link>
                                <ul>
                                    <li>
                                        Price: ${product.price}
                                    </li>
                                    <li>
                                        Stock: {product.stock}
                                    </li>
                                    <li>
                                        Type: {product.tag}
                                    </li>
                                </ul>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Products;

