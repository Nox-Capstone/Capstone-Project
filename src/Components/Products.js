import React, { useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';

const { fetchProducts } = require("../api");

const Products = () => {
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        const allProducts = await fetchProducts();
        setProducts(allProducts)
    }

    useEffect(() => {
        getProducts();
    }, []);

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

