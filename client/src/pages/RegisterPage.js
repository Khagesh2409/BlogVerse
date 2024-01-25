import { useState } from "react";
import axios from 'axios';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    async function register(ev) {
        ev.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/register', { username, password }, { headers: { 'Content-type': 'application/json' } });
            if (response.status === 200) {
                alert('Registration successful.');
            } else {
                alert('Registration failed.');
            }
        } catch (error) {
            console.log(error);
            alert('Registration failed.');
        }
    }
    return (
        <form className='register' onSubmit={register}>
            <h1>Register</h1>
            <input type='text'
                placeholder='username'
                value={username}
                onChange={ev => setUsername(ev.target.value)}></input>
            <input type='password'
                placeholder='password'
                value={password}
                onChange={ev => setPassword(ev.target.value)}></input>
            <button>Register</button>
        </form>
    );
};