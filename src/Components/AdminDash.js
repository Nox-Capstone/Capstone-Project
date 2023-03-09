import React, { useEffect, useState } from 'react';

const AdminDash = (props) => {
    const { products, allUsers } = props;
    const token = window.localStorage.getItem("token")

    if(token){
        return(
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
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </div>    
                            );
                        })};
                    </div>
                    <div className="adminUsers">
                        <h1>Users</h1>
                        <hr></hr>
                        {allUsers.map(user => {
                            return (
                                <div key={user.id}>
                                    <h3>{user.username}</h3>
                                    { !user.isAdam ? <button>Delete User</button> : null }
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