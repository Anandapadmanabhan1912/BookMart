// pages/login.js
import { useState } from "react";
import styles from "./Auth.module.css"; // Import the CSS module
import SocialButton from "../components/SocialButton";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
  };

  const handleFacebookLogin = () => {
    // Handle Facebook login logic here
  };

  return (
    <div className={styles.container}>
      <img src="/logo.png" alt="logo" width="40" height="40" />
      <h2 className={styles.title}>Login to BookMart</h2>
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
      <p className={styles.p}>or</p>
      <p className={styles.p}>
        <SocialButton provider="google" onClick={handleGoogleLogin} />
        <SocialButton provider="facebook" onClick={handleFacebookLogin} />
        Don't have an account?
        <Link href="/signup">Signup</Link>
      </p>
    </div>
  );
}
