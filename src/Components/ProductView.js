import React from 'react';
import { Link, useParams } from 'react-router-dom';

const ProductView = (props) => {
    const products = props.products;
    const id = useParams().productId;
    const product = products.find(product => product.id === parseInt(id));
    return (
        <div>
            <h2>{product.brand} {product.name}</h2>
            <img src={product.image}/>
            <p>Price: ${product.price}</p>
            <p>Description: {product.description}</p>
            <p>Product Type: {product.tag}</p>
            <p>Quantity: {product.quantity}</p>
        </div>
    )
}

export default ProductView;