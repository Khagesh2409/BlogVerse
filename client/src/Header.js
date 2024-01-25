import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { UserContext } from './UserContext';

export default function Header() {
    const {setUserInfo, userInfo} = useContext(UserContext);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:4000/profile', { headers: { 'Content-type': 'application/json' }, withCredentials: true });
            setUserInfo(response.data);
        };
        fetchData();
    }, []);

    async function logout() {
        await axios.post('http://localhost:4000/logout', {}, {withCredentials: true});
        setUserInfo(null);
    }

    const username = userInfo?.username;
    
    return (
        <header>
            <Link to='/' className='logo'>BlogVerse</Link>
            <nav>
                {username && (
                    <>
                        <Link to='/create'>Create new post</Link>
                        <a onClick={logout} style={{cursor:'pointer'}}>Logout</a>
                    </>
                )}
                {!username && (
                    <>
                        <Link to='/login'>Login</Link>
                        <Link to='/register'>Register</Link>
                    </>
                )}

            </nav>
        </header>
    );
};