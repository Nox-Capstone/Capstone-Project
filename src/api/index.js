

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

module.exports = {
    fetchProducts,
}