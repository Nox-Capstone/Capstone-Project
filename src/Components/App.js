import React, { useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { fetchProducts, exchangeTokenForUser, fetchCartByUserId } from '../api/fetch';
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

  const getUser = async () => {
    if(window.localStorage.getItem("token")){
      const user = await exchangeTokenForUser();
      const cart = await fetchCartByUserId(user.id)
      setUser(user);
      setCart(cart);
    } else setUser({})
  }

  useEffect(() => {
    getUser();
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
              <Route path='/' element={<Home />} />
            </>

          ) : (
            <>
              <Route path='/register' element={<Register setToken={setToken} setUser={setUser} setCart={setCart} />} />
              <Route path='/login' element={<Login token={token} setUser={setUser} user={user} setCart={setCart} />} />
              <Route path='/products' element={<Products products={products} cart={cart} />} />
              <Route path='/products/search/:term' element={<Products products={products} cart={cart} />} />
              <Route path='/products/:productId' element={<ProductView products={products} cart={cart} />} />
              <Route path='/cart' element={<Cart user={user} cart={cart} />} />
              <Route path='/admin' element={<AdminDash products={products}/>} />
            </>
          )
        }
      </Routes>
    </div>
  );
};

export default App;
