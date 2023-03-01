

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

module.exports = {
    fetchProducts,
    fetchProductsById
}