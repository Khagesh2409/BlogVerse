import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/profile", {
          headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });
        if (response.data === "") return setUserInfo(null);
        else setUserInfo(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setUserInfo(null);
        } else {
          console.error("An error occurred:", error);
        }
      }
    };
    fetchData();
  }, []);

  async function logout() {
    await axios.post(
      "http://localhost:4000/logout",
      {},
      { withCredentials: true }
    );
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        BlogVerse
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <a onClick={logout} style={{ cursor: "pointer" }}>
              Logout
            </a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
