import React, { useEffect, useState } from 'react';

const {fetchProducts} = require("../api");

const Products = () => {
    const [products, setProducts] = useState([]);

    const getProducts = async ()=> {
        const allProducts = await fetchProducts();
        setProducts(allProducts)
    }

    useEffect(()=> {
        getProducts();
    }, []);

    return (
        <div>
            <h1>
                Products {products.length}
            </h1>
        </div>
    )
}

export default Products;

