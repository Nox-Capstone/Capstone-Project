import React, { useEffect, useState } from 'react';
import Home from './Home';
import Login from './Login';
import { Link, Routes, Route } from 'react-router-dom';
import Products from './Products';
import ProductView from './ProductView';
import Cart from './Cart';
import { fetchProducts } from '../api/fetch';
import Register from './Register';

const App = () => {
  const [auth, setAuth] = useState({});
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null)

  // const attemptLogin = () => {
  //   const token = window.localStorage.getItem('token');
  //   if (token) {
  //     fetch(
  //       '/api/auth/',
  //       {
  //         method: 'GET',
  //         headers: {
  //           'authorization': token
  //         }
  //       }
  //     )
  //       .then(response => response.json())
  //       .then(user => setAuth(user))
  //       .then(user => setUser(user));
  //   }
  // };

  const getProducts = async () => {
    const allProducts = await fetchProducts();
    setProducts(allProducts)
  }

  useEffect(() => {
    //attemptLogin();
    getProducts();
  }, []);

  const logout = async (ev) => {
    window.localStorage.removeItem("token", token)
    setUser({})
  }

  // const login = async ({ username, password }) => {
  //   await fetch(
  //     '/api/auth/',
  //     {
  //       method: 'POST',
  //       body: JSON.stringify({ username, password }),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     }
  //   )
  //     .then(response => response.json())
  //     .then((data) => {
  //       if (data.token) {
  //         window.localStorage.setItem('token', data.token);
  //         attemptLogin();
  //       }
  //       else {
  //         console.log(data);
  //       }
  //     });
  // };


  return (
    <div>
      <h1>Nox PC Builder</h1>
      <nav>
        {

          <>
            {user.isAdam ? <Link to='/admin'>Admin</Link> : null}
            {user.username ? null : <Link to='/register'>Register</Link>}
            {user.username ? <button onClick={logout}>Logout</button> : <Link to='/login'>Login</Link>}
            <Link to='/products'>Products</Link>
            <Link to='/cart'>Cart</Link>
          </>

        }
      </nav>

      <Routes>
        {
          auth.id ? (
            <>
              <Route path='/' element={<Home auth={auth} />} />
            </>

          ) : (
            <>
              <Route path='/register' element={<Register setToken={setToken} setUser={setUser} />} />
              <Route path='/login' element={<Login token={token} setUser={setUser} user={user} />} />
              <Route path='/products' element={<Products products={products} />} />
              <Route path='/products/:productId' element={<ProductView products={products} />} />
              <Route path='/cart' element={<Cart user={user} />} />
            </>
          )
        }
      </Routes>
    </div>
  );
};

export default App;
