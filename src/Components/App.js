import React, { useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { fetchProducts, exchangeTokenForUser, fetchCartByUserId, fetchAllUsers } from '../api/fetch';
import Cart from './Cart';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Products from './Products';
import ProductView from './ProductView';
import AdminDash from './AdminDash';
import Profile from './Profile';

const App = () => {
  const [auth, setAuth] = useState({});
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null)
  const [cart, setCart] = useState({});
  const [allUsers, setAllUsers] = useState([]);

  const getProducts = async () => {
    const allProducts = await fetchProducts();
    setProducts(allProducts)
  }

  //New function for getting and setting all users
  const getAllUsers = async () => {
    const allUsers = await fetchAllUsers();
    setAllUsers(allUsers);
  }


  const getUser = async () => {
    if (window.localStorage.getItem("token")) {
      const user = await exchangeTokenForUser();
      setUser(user);
      await getCart(user.id);
    } else setUser({})
  }

  const getCart = async (userId) => {
    const cart = await fetchCartByUserId(userId)
    console.log("HI I'm CART AT APP", cart)
    setCart(cart);
  }

  useEffect(() => {
    getUser();
    getProducts();
    getAllUsers();
  }, []);

  const logout = async (ev) => {
    window.localStorage.removeItem("token", token)
    setUser({})
    setCart({})
  }

  return (
    <div>
      <Link to='/'>Nox PC Builder</Link>
      <nav>
        {

          <>
            {user.isAdam ? <Link to='/admin'>Admin</Link> : null}
            {user.username ? <Link to='/profile'>Profile</Link> : null}
            {user.username ? null : <Link to='/register'>Register</Link>}
            {user.username ? <button onClick={logout}>Logout</button> : <Link to='/login'>Login</Link>}
            <Link to='/products'>Products</Link>
            <Link to='/cart'>Cart({!cart.products ? 0 : cart.products.length})</Link>
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
              <Route path='/' element={<Home />} />
              <Route path='/register' element={<Register setToken={setToken} setUser={setUser} setCart={setCart} />} />
              <Route path='/login' element={<Login token={token} setUser={setUser} user={user} setCart={setCart} />} />
              <Route path='/products' element={<Products products={products} cart={cart} />} />
              <Route path='/products/search/:term' element={<Products products={products} cart={cart} />} />
              <Route path='/products/:productId' element={<ProductView products={products} cart={cart} setCart={setCart} />} />
              <Route path='/cart' element={<Cart user={user} cart={cart} setCart={setCart} products={products} />} />
              <Route path='/admin' element={<AdminDash products={products} allUsers={allUsers} />} />
              <Route path='/profile' element={<Profile user={user} />} />
            </>
          )
        }
      </Routes>
    </div>
  );
};

export default App;
