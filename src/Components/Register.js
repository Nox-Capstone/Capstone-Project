import React, { useState } from 'react';
import { fetchRegister } from '../api/fetch';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const registerButton = async () => {
        const registerUser = await fetchRegister({ username, password });
        return registerUser;
    };
    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={registerButton}>
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
            </form>
        </div>
    );
}

export default Register;