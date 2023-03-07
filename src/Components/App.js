import React, { useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { fetchProducts, createCart } from '../api/fetch';
import Cart from './Cart';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Products from './Products';
import ProductView from './ProductView';
import AdminDash from './AdminDash';

const App = () => {
  const [auth, setAuth] = useState({});
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null)
  const [cart, setCart] = useState({});

  const getProducts = async () => {
    const allProducts = await fetchProducts();
    setProducts(allProducts)
  }

  useEffect(() => {
    setToken(window.localStorage.getItem("token", token))
    getProducts();
  }, []);


  const logout = async (ev) => {
    window.localStorage.removeItem("token", token)
    setUser({})
    setCart({})
  }

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
              <Route path='/login' element={<Login token={token} setUser={setUser} user={user} setCart={setCart} />} />
              <Route path='/products' element={<Products products={products} cart={cart} />} />
              <Route path='/products/search/:term' element={<Products products={products} cart={cart} />} />
              <Route path='/products/:productId' element={<ProductView products={products} cart={cart} />} />
              <Route path='/cart' element={<Cart user={user} cart={cart} />} />
              <Route path='/login' element={<Login token={token} setUser={setUser} user={user} />} />
              <Route path='/products' element={<Products products={products} />} />
              <Route path='/products/:productId' element={<ProductView products={products} />} />
              <Route path='/cart' element={<Cart user={user} />} />
              <Route path='/admin' element={<AdminDash />} />
            </>
          )
        }
      </Routes>
    </div>
  );
};

export default App;
