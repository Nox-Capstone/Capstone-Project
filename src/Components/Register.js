import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { fetchRegister, createCart } from '../api/fetch';

const Register = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setToken } = props;
    const navigate = useNavigate();

    const registerButton = async (ev) => {
        ev.preventDefault();
        const registerUser = await fetchRegister({username, password});
        const token = window.localStorage.getItem("token");

        if (registerUser.token) {
            window.localStorage.setItem("token", token)
            setToken(registerUser.token)
            toast.success('Successfully Registered!')
            const userId = registerUser.user.id;
            const newCart = await createCart({ token, userId });
            navigate('/login');
        } else {
            toast.error('Failed to Register New User')
        }
    };
    return (<div>
        <div>

            <h2 className='regHead'>Register An Account With Nox</h2>

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
                    <button type="submit">Register</button>
                    <Toaster 
                        position="top-center"
                        reverseOrder={false}
                    />
                </div>

                <Link to='/Login'>
                    Already of an account?<span className='clickMe'> Click here.</span>
                </Link>
            </form>
        </div>
    </div>
    );
}

export default Register;