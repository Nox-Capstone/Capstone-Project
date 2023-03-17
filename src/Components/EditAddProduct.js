import React, { useEffect, useState } from 'react';
import { updateProduct, fetchAddProduct, fetchProducts } from '../api/fetch';


const EditAddProduct = (props) => {
    const { product, setProduct, products, setProducts } = props;
    const[name, setName] = useState("");
    const[description, setDescription] = useState("");
    const[price, setPrice] = useState("");
    const[stock, setStock] = useState("");
    const[brand, setBrand] = useState("");
    const[tag, setTag] = useState("");
    const[image, setImage] = useState("");

    useEffect(()=> {
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setStock(product.stock);
        setBrand(product.brand);
        setTag(product.tag);
        setImage(product.image);
        setProduct(product)
    }, [product])

    const editProduct = async(ev) => {
        ev.preventDefault();
        const token = localStorage.getItem('token');
        if(!token) return;
        try {
            const edit = await updateProduct({
                token, 
                productId: product.id,
                name, 
                description, 
                price, 
                stock, 
                brand, 
                tag, 
                image
            });
            setProduct(edit);
        } catch (err) {
            console.error(err);
        };
    };

    const addProduct = async (ev) => {
        ev.preventDefault();
        const token = window.localStorage.getItem('token');
        if(!token) return;
        try {
            const newProduct = await fetchAddProduct({
                token, 
                name, 
                description, 
                price, 
                stock,
                brand,
                tag,
                image
            });
            setProducts([newProduct, ...products])
        } catch (err) {
            console.error(err);
        };
    };

    return (
        <form onSubmit={product.id ? editProduct : addProduct}>
            <label>
                Name:
                <input type="text" value={name} onChange={(ev) => setName(ev.target.value)} />
            </label>
            <br />
            <label>
                Description:
                <input type="text" value={description} onChange={(ev) => setDescription(ev.target.value)} />
            </label>
            <br />
            <label>
                Price:
                <input type="number" value={price} onChange={(ev) => setPrice(ev.target.value)} />
            </label>
            <br />
            <label>
                Stock:
                <input type="number" value={stock} onChange={(ev) => setStock(ev.target.value)} />
            </label>
            <br />
            <label>
                Brand:
                <input type="text" value={brand} onChange={(ev) => setBrand(ev.target.value)} />
            </label>
            <br />
            <label>
                Tag:
                <input type="text" value={tag} onChange={(ev) => setTag(ev.target.value)} />
            </label>
            <br />
            <label>
                Image URL:
                <input type="text" value={image} onChange={(ev) => setImage(ev.target.value)} />
            </label>
            <br />
            {product.id ? <button type="submit">SAVE</button> : <button type="submit">Add New Product</button>}
        </form>
    )
}

export default EditAddProduct;