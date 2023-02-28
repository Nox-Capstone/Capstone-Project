




const fetchProducts = async () => {
    try {
        const response = await fetch(
            '/api/products/',
            {
              method: 'GET'
            }
        );
        const result = await response.json();

    } catch (err) {
        console.log(err);
    }
}