//URL in process.env HERE
const url = process.env.DATABASE_URL;

const fetchLogin = async (username, password) => {
    try {
        const response = await fetch(`${url}/users/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
        });
        const result = await response.json();
        window.localStorage.setItem("token", result.token)
        return result;
    } catch (error) {
        console.error(error)
    }
}

const fetchRegister = async ({username, password}) => {
    try {
        const response = await fetch(`${url}/users/register/`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }
        );
        const result = await response.json();
        return result;
    } catch (err) {
        console.error(err);
    }
}

const fetchProducts = async () => {
    try {
        const response = await fetch(
            `${url}/products/`,
            {
                method: 'GET'
            }
        );
        const result = await response.json();
        return result

    } catch (err) {
        console.error(err);
    }
}

const fetchProductsById = async (id) => {
    try {
        const response = await fetch(`
        ${url}/products/${id}
        `, {
            method: 'GET'
        }
        );
    } catch (err) {
        console.err(err)
    }
}

const fetchUser = async (token) => {
    try {
        const response = await fetch(`${url}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

const fetchAllUsers = async () => {
    const response = await fetch(`${url}/users`);
    const result = await response.json();
    return result;
}

const addToCart = async ({ token, productId, cartId, quantity }) => {
    try {
        const response = await fetch(`${url}/cart_products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                cartId,
                productsId: productId,
                quantity,
            })
        })
        const result = await response.json()
        return result;
    } catch (error) {
        console.error(error)
    }
}

const createCart = async ({ token, userId }) => {
    try {
        const response = await fetch(`${url}/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                userId
            })
        })
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error)
    }
}

const fetchCartByUserId = async (userId) => {
    try {
        const response = await fetch(`${url}/cart/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error)
    }
}

const fetchCartProductByCartId = async (cartId) => {
    try {
        const response = await fetch(`${url}/cart_products/${cartId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const result = await response.json();
        console.log()
        return result;
    } catch (error) {
        console.error(error);
    }
}

const exchangeTokenForUser = async () => {
    const token = window.localStorage.getItem("token");
    if (token) {
        const response = await fetch(`${url}/users/me`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        const result = await response.json();
        return result;
    }
};

const updateProduct = async ({
    token,
    productId,
    name,
    description,
    price,
    stock,
    brand,
    tag,
    image
}) => {
    try {
        if (token) {
            const response = await fetch(`${url}/products/${productId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                },
                body: JSON.stringify({
                    name,
                    description,
                    price,
                    stock,
                    brand,
                    tag,
                    image
                })
            });
            const result = await response.json();
            return result;
        }
    } catch (err) {
        console.error(err);
    };
};

const fetchAddProduct = async ({
    token, 
    name, 
    description, 
    price, 
    stock, 
    brand, 
    tag, 
    image
}) => {
    try {
        if(token){
            const response = await fetch(`${url}/products`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                },
                body: JSON.stringify({
                    name, 
                    description,
                    price,
                    stock,
                    brand,
                    tag,
                    image
                })
            });
            const result = await response.json();
            return result;
        }
    } catch (err) {
        console.error(err);
    };
};

const fetchDeleteProduct = async ({ id, token }) => {
    try {
        await fetch(`${url}/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
        });
    } catch (err) {
        console.error(err)
    }
}

const deleteCartProduct = async (productsId) => {
    try {
        const token = window.localStorage.getItem("token");
        console.log(productsId, "calling delete cart product");
        if (!token) return;
        const response = await fetch(`${url}/cart_products/${productsId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const updatedCart = await response.json();
        return updatedCart;
    } catch (error) {
        console.error(error)
    }
}
const purchaseCart = async () =>{
    try{
        const token = window.localStorage.getItem('token');
        if(!token) return;
        const response = await fetch(`${url}/cart/checkout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application',
            Authorization: token,
          },
        });
        const result = await response.json();
        return result;
    }catch(error){
        console.error(error)
    }
}

module.exports = {
    fetchProducts,
    fetchProductsById,
    fetchRegister,
    fetchLogin,
    fetchUser,
    fetchAllUsers,
    fetchCartByUserId,
    fetchCartProductByCartId,
    addToCart,
    createCart,
    exchangeTokenForUser,
    updateProduct,
    fetchAddProduct,
    fetchDeleteProduct,
    deleteCartProduct,
    purchaseCart
}