import { useContext, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUserInfo } = useContext(UserContext);
    async function login(ev) {
        ev.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/login', { username, password }, { headers: { 'Content-type': 'application/json' }, withCredentials: true });
            // const userInfo = await response.json();
            if (response.status === 200) {
                setUserInfo(response.data);
                setRedirect(true);
            } else {
                alert('Wrong credentials.');
            }
        } catch (error) {
            console.error("There was an error during the request", error);
            alert('Error during login. Please try again.');
        }

    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <form className='login' onSubmit={login}>
            <h1>Login</h1>
            <input type='text'
                placeholder='username'
                value={username}
                onChange={ev => setUsername(ev.target.value)}
            ></input>
            <input type='password'
                placeholder='password'
                value={password}
                onChange={ev => setPassword(ev.target.value)}
            ></input>
            <button>Login</button>
        </form>
    );
};