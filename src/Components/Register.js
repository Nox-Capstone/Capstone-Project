import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { fetchRegister, createCart } from '../api/fetch';

const Register = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setToken, setUser, setCart } = props;

    const registerButton = async (ev) => {
        ev.preventDefault();
        const registerUser = await fetchRegister(username, password);
        const token = window.localStorage.getItem("token");
        if (registerUser.token) {
            window.localStorage.setItem("token", token)
            setToken(registerUser.token)
        }
        if (registerUser.user) {
            setUser(registerUser.user)
            toast.success('Successfully Registered!')
            navigate('/login')
        } else {
            toast.error('Failed to Register New User')
        }
    };
    return (
        <div>
            <h2 className='regHead'>Register An Account</h2>
            <form className='register' onSubmit={registerButton}>
                <div className='userPass'>
                    <input
                        placeholder='username'
                        value={username}
                        onChange={ev => setUsername(ev.target.value)}
                    />
                    <input
                        placeholder='password'
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                    />
                    <button>Register</button>
                </div>

                <Link to='/Login'>
                    Already of an account?<span className='clickMe'> Click here.</span>
                </Link>
            </form>
        </div>
    );
}

export default Register;