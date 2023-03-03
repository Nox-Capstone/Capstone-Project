import React, { useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';


const Products = (props) => {
    const {products} = props

    return (
        <div>
            <h1>
                Products ({products.length})
            </h1>
            <ul>
                {
                    products.map(product => {
                        return (
                            <li key={product.id}>
                                <Link to={`/products/${product.id}`} >{product.name}</Link>
                                <ul>
                                    <li>
                                        Price: ${product.price}
                                    </li>
                                    <li>
                                        Stock: {product.quantity}
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

