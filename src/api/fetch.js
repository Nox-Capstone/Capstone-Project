
const fetchLogin = async (username, password) => {
    try {
        const response = await fetch(`/api/users/login`, {
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

const fetchRegister = async (username, password) => {
    try {
        const response = await fetch(
            `/api/users/register/`,
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
        console.log(response)
        console.log(result)
        return result;
    } catch (err) {
        console.error(err);
    }
}

const fetchProducts = async () => {
    try {
        const response = await fetch(
            '/api/products/',
            {
                method: 'GET'
            }
        );
        const result = await response.json();
        return result

    } catch (err) {
        console.log(err);
    }
}

const fetchProductsById = async (id) => {
    try {
        const response = await fetch(`
        /api/products/${id}
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
        const response = await fetch(`/api/users/me`, {
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

const addToCart = async ({ token, productId, cartId, quantity }) => {
    try {
        const response = await fetch(`api/cart_products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                cartId,
                productsId: productId,
                quantity
            })
        })
        const result = await response.json()
        console.log(result, 'in fetch addToCart')
        return result;
    } catch (error) {
        console.error(error)
    }
}

const createCart = async ({ token, userId }) => {
    try {
        const response = await fetch(`api/cart`, {
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
        console.log(result, 'result in createCart fetch')
        return result;
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    fetchProducts,
    fetchProductsById,
    fetchRegister,
    fetchLogin,
    fetchUser,
    addToCart,
    createCart
}