import React, { useEffect, useState } from 'react';
// const { getAllProducts } = require("../../server/db/Products");

const Products = () => {
    const [products, setProducts] = useState([]);
    // const allProductsList = async () => {
    //     const allProducts = await getAllProducts();
    //     setProducts(allProducts);
    // }
    // useEffect(() => {
    //     allProductsList()
    // }, []);
    // console.log(allProductsList);
    return (
        <div>
            <h1>
                Products
            </h1>
        </div>
    )
}

export default Products;