import Image from "next/image";
import React from "react";
import Carousel from "../components/Carousel";
import BookList from "../components/BookList";
import Link from "next/link";

export default function Home() {
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
        {/* login */}
        <Link href="/login">
          <button>Login</button>
        </Link>
        {/* signup */}
        <Link href="/signup">
          <button>Signup</button>
        </Link>
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
