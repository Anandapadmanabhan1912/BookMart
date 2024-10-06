// pages/login.js
import { useState } from "react";
import styles from "./Auth.module.css"; // Import the CSS module
import Link from "next/link";
import { useRouter } from "next/router";
import { JWT_ACCESS_TOKEN } from "@/constants";
import api from "@/lib/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    // Handle login logic here
    try {
      const response = await api.post("/api/login", {
        email,
        password,
      });

      const token = response.data.authToken;
      localStorage.setItem(JWT_ACCESS_TOKEN, token);
      router.push("/");
    } catch (error) {
      // console.error("Error logging in:", error);
      setError("Error logging in. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <img src="/logo.png" alt="logo" width="40" height="40" />
      <h2 className={styles.title}>Login to BookMart</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin} className={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
      <p className={styles.p}>
        Don't have an account?
        <Link href="/signup">Signup</Link>
      </p>
    </div>
  );
}
