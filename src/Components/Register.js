import React, { useState } from 'react';
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
        // if (registerUser.token) {
        //     window.localStorage.setItem("token", token)
        //     setToken(registerUser.token)
        // }
        if (registerUser.user) {
            setUser(registerUser.user)
        }
    };
    return (<div>
        <div>
            <h2>Register for an account with Nox!</h2>
            <form className='register' onSubmit={registerButton}>
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
                <Link to='/Login'>
                    Click here if you have an account.
                </Link>
            </form>
        </div>
    </div>
    );
}

export default Register;