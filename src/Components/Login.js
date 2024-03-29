import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchLogin, fetchUser, fetchCartByUserId } from '../api/fetch';
import toast, { Toaster } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';


const Login = (props) => {
  const { token, user, setUser, cart, setCart } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('')
  const navigate = useNavigate();

  useEffect(()=>{

    if(user.username){
      const timeout = setTimeout(()=>{
      navigate("/")
    }, 4000)
    return () =>{
      clearTimeout(timeout)
    }
  }
  },[user])

  const getCart = async (id) => {
    const userCart = await fetchCartByUserId(id);
    setCart(userCart);
  };

  const login = async (ev) => {
    ev.preventDefault();
    const login = await fetchLogin(username, password);
    const token = login.token;
    if (token) {
      window.localStorage.setItem("token", token);
      const user = await fetchUser(token);
      setUser(user);
      getCart(user.id)
      toast.success('Login Successful!')
    } else {
      toast.error('Login Failed')
    }
  };
  return (
    <div className="logout">
        <div>
          <form className='login' onSubmit={login} >
            <h2>Login To Your Account</h2>

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
              <Toaster
                position="top-center"
                reverseOrder={false}
              />
            </div>
            <Link to='/Register'>
              Don't Have An Account Yet? <span className='clickMe'>Click Here</span>.
            </Link>
          </form>
        </div>
    </div>
  );
};

export default Login;
