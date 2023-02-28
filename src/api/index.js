

const fetchProducts = async () => {
    try {
        const response = await fetch(
            '/api/products/',
            {
              method: 'GET'
            }
        );
        const result = await response.json();
        console.log(result);

    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    fetchProducts,
}