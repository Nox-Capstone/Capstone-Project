import React from 'react';
import { Link, useParams } from 'react-router-dom';
import AddToCart from './AddToCart';

const ProductView = (props) => {
    const products = props.products;
    // const cartId = 'cart placeholder'
    const id = useParams().productId;
    const {cart, setCart} = props
    console.log(cart)
    const product = products.find(product => product.id === parseInt(id));
    if (!product) {
        return null
    }
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
            <p>Stock: {product.stock}</p>
            <div>
                <AddToCart productId={id} cartId={cart.id} setCart={setCart} />
            </div>
        </div>
    )
}

export default ProductView;