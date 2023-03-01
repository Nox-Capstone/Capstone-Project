import React, { useEffect, useState } from 'react';
import Home from './Home';
import Login from './Login';
import { Link, Routes, Route } from 'react-router-dom';
import Products from './Products';
import ProductView from './ProductView';

import { fetchProducts } from '../api';

const App = () => {
  const [auth, setAuth] = useState({});
  const [products, setProducts] = useState([]);
  const attemptLogin = () => {
    const token = window.localStorage.getItem('token');
    if (token) {
      fetch(
        '/api/auth/',
        {
          method: 'GET',
          headers: {
            'authorization': token
          }
        }
      )
        .then(response => response.json())
        .then(user => setAuth(user));
    }
  };
  const getProducts = async () => {
      const allProducts = await fetchProducts();
      setProducts(allProducts)
  }
  useEffect(() => {
    attemptLogin();
    getProducts();
  }, []);

  const logout = () => {
    window.localStorage.removeItem('token');
    setAuth({});
  }

  const login = async ({ username, password }) => {
    fetch(
      '/api/auth/',
      {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(response => response.json())
      .then((data) => {
        if (data.token) {
          window.localStorage.setItem('token', data.token);
          attemptLogin();
        }
        else {
          console.log(data);
        }
      });
  };

  return (
    <div>
      <h1>FS UNI App Template</h1>
      <nav>
        {
          auth.id ? (
            <>
              <Link to='/'>Home</Link>
              <button onClick={logout}>Logout {auth.username}</button>
            </>
          ) : (
            <>
              <Link to='/login'>Login</Link>
            </>
          )
        }
        <Link to='/products'>Products</Link>
      </nav>

      <Routes>
        {
          auth.id ? (
            <>
              <Route path='/' element={<Home auth={auth} />} />
            </>

          ) : (
            <>
              <Route path='/login' element={<Login login={login} />} />
            </>
          )
        }
        <Route path='/products' element={<Products products={products}/>} />
        <Route path='/products/:productId' element={<ProductView products={products} />} />
      </Routes>
    </div>
  );
};

export default App;
