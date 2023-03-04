import React from 'react';
import { Link, useParams } from 'react-router-dom';
import AddToCart from './AddToCart';

const ProductView = (props) => {
    const products = props.products;
    // const cartId = 'cart placeholder'
    const id = useParams().productId;
    const product = products.find(product => product.id === parseInt(id));
    console.log(product);
    const productsId = product.id
    return (
        <div>
            {
                <h3><Link to={'/products'}> &#x3C; Back </Link></h3>
            }
            <h2>{product.brand} {product.name}</h2>
            <img src={product.image} />
            <p>Price: ${product.price}</p>
            <p>Description: {product.description}</p>
            <p>Product Type: {product.tag}</p>
            <p>Quantity: {product.quantity}</p>
            <div>
                <AddToCart productsId={productsId} cartId={cartId} />
            </div>
        </div>
    )
}

export default ProductView;