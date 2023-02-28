import React, { useState } from 'react';

const {fetchProducts} = "../api"

const Products = () => {
    const [products, setProducts] = useState([]);



    return (
        <div>
            <h1>
                Products
            </h1>
        </div>
    )
}

export default Products;

