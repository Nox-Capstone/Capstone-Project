import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchLogin, fetchUser, createCart, fetchCartByUserId } from '../api/fetch';

const Login = (props) => {
  const { token, user, setUser, cart, setCart } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async (ev) => {
    ev.preventDefault();
    const login = await fetchLogin(username, password);
    const token = login.token;
    window.localStorage.setItem("token", token);
    const user = await fetchUser(token);
    console.log("line 20 user", user)
    setUser(user)
    try {
      const cart = await getCart(userId)
      if (!cart) {
        cart = await assignCart({ token, userId })
      }
      return cart;
    } catch (error) {
      console.log("didnt find a cart")
    }
  };

  return (
    <div className="logout">

      <div>
        <form className='login' onSubmit={login} >

          <div className='userPass'>
            <input
              placeholder="username"
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
            />
            <input
              placeholder="password"
              type={'password'}
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <button disabled={!username || !password}>Login</button>
          </div>
          <Link to='/Register'>
            Don't Have An Account Yet? Click Here.
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
