

const fetchProducts = async () => {
    try {
        const response = await fetch(
            'localhost:3000/api/products/',
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