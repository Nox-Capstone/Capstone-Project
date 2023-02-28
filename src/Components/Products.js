import React, { useEffect, useState } from 'react';
const { getAllProducts } = require("../../server/db/Products")
const Products = () => {
    const [products, setProducts] = useState([]);
    const allProductsList = async () => {
        const getProducts = await getAllProducts();
        setProducts(getProducts);
    }
    useEffect(() => {
        allProductsList()
    }, []);
    console.log(products);
    return (
        <div>
            <h1>
                Products
            </h1>
        </div>
    )
}

export default Products;