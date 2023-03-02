
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
module.exports = {
    fetchProducts,
    fetchProductsById,
    fetchRegister,
    fetchLogin,
    fetchUser
}