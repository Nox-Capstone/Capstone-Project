import React, { useEffect, useState } from 'react';
import { fetchDeleteProduct } from '../api/fetch';
import EditAddProduct from './EditAddProduct';
import ProductView from './ProductView';

const AdminDash = (props) => {
    const { products, allUsers, setProducts, getProducts} = props;
    const [product, setProduct] = useState({});
    const token = window.localStorage.getItem("token")

    if (token) {
        return (
            <div className="adminDash">
                <h1>Welcome to the Admin Page</h1>
                <div className="adminUsersProducts">
                    <div className="adminProducts">
                        <h1>Products</h1>
                        <hr></hr>
                        {products.map(product => {
                            return (
                                <div key={product.id}>
                                    <h3>{product.name}</h3>
                                    <p>{product.description}</p>
                                    <p>{product.price}</p>
                                    <p>{product.quantity}</p>
                                    <p>{product.brand}</p>
                                    <p>{product.tag}</p>
                                    <button onClick={() => setProduct(product)}>Edit</button>
                                    <button onClick={async () => { 
                                        await fetchDeleteProduct({ id: product.id, token: token }) 
                                        //await getProducts(); 
                                        //filter products remove the deleted item and reset products
                                        const updatedProducts = products.filter(prod => product.id !== prod.id)
                                        setProducts(updatedProducts);
                                        }}>Delete</button>
                                </div>
                            );
                        })};
                    </div>
                    <div className="editProduct">
                        <EditAddProduct product={product} setProduct={setProduct} setProducts={setProducts} products={products} getProducts={getProducts}/>
                    </div>
                    <div className="adminUsers">
                        <h1>Users</h1>
                        <hr></hr>
                        {allUsers.map(user => {
                            return (
                                <div key={user.id}>
                                    <h3>{user.username}</h3>
                                    {user.isAdam? <p>Admin</p> : <p>Standard User</p>}
                                    {!user.isAdam ? <button>Delete User</button> : null}
                                    <hr></hr>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminDash;