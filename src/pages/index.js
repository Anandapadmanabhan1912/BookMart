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
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]); // State to hold book data
  const [loading, setLoading] = useState(true); // Loading state

  const fetchBooks = async () => {
    try {
      const response = await api.get("/api/getbooks", {
        params: { search: query }, // `params` automatically appends the query string
      });
      if (response.status === 200) {
        setBooks(response.data.books);
        setLoading(false);
      }
      // console.log(response.data);
    } catch (error) {
      console.log("Error fetching books:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchBooks(); // Fetch books based on search query
    // console.log("Search query:", query);
  };

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
    fetchBooks(); // Fetch books on page load
  }, []);

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
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </nav>

      {/* Horizontal Carousel */}
      <Carousel />

      {/* Book Cards */}
      <BookList books={books} loading={loading} />

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
