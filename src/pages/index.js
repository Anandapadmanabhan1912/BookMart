import React from "react";
import Carousel from "../components/Carousel";
import BookList from "../components/BookList";
import Link from "next/link";
import { useState, useEffect } from "react";
import { JWT_ACCESS_TOKEN } from "@/constants";
import api from "@/lib/api";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    // Only run on the client side
    const token = localStorage.getItem(JWT_ACCESS_TOKEN);
    console.log(token);
    if (token) {
      setIsLoggedIn(true); // User is logged in if the token exists
      getUser();
    } else {
      setIsLoggedIn(false);
      setUserName(null);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem(JWT_ACCESS_TOKEN);
    window.location.reload();
  };

  const getUser = async () => {
    try {
      const response = await api.get("/api/getuser");
      const userName = response.data.user.name;
      console.log("User name:", userName);
      setUserName(userName);
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>
          <img src="/logo.png" alt="logo" width="40" height="40" /> BookMart
        </div>
        <ul style={styles.navItems}>
          <li>Thriller</li>
          <li>Fiction</li>
          <li>Non-Fiction</li>
          <li>Romance</li>
          <li>Science Fiction</li>
        </ul>
        {isLoggedIn ? (
          <div>
            <p>
              {userName && `Signed in as ${userName}`}
              <button onClick={handleLogout}>Logout</button>
            </p>
          </div>
        ) : (
          <div>
            {/* login */}
            <Link href="/login">
              <button>Login</button>
            </Link>
            {/* signup */}
            <Link href="/signup">
              <button>Signup</button>
            </Link>
          </div>
        )}
      </nav>

      {/* Horizontal Carousel */}
      <Carousel />

      {/* Book Cards */}
      <BookList />

      {/* Footer */}
      <footer style={styles.footer}>
        <p>Contact: info@bookmart.com</p>
        <p>Address: 123 Book Street, Booktown</p>
      </footer>
    </div>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem",
    background: "#f4f4f4",
  },
  logo: { fontSize: "1.5rem", fontWeight: "bold" },
  navItems: { display: "flex", gap: "1rem", listStyle: "none" },
  footer: { padding: "2rem", background: "#eee", textAlign: "center" },
};
