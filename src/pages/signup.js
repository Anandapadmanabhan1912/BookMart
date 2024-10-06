// pages/signup.js
import { useState } from "react";
import styles from "./Auth.module.css"; // Reuse the same CSS module
import Link from "next/link";
import { useRouter } from "next/router";
import { JWT_ACCESS_TOKEN } from "@/constants";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("male"); // Default gender
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    // Handle signup logic here
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
          dob,
          gender,
          address,
          country,
        }),
      });
      const data = await response.json();
      // console.log(data);
      localStorage.setItem(JWT_ACCESS_TOKEN, data.authToken);
      router.push("/");
    } catch (error) {
      console.error("Error signing up:", error);
      setError("Error signing up. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <img src="/logo.png" alt="logo" width="40" height="40" />
      <h2 className={styles.title}>Create an Account</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSignup} className={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={styles.input}
        />
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
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
          className={styles.input}
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className={styles.input}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Sign Up
        </button>
      </form>
      <p className={styles.p}>
        Already have an account?
        <Link href="/login">Login</Link>
      </p>
    </div>
  );
}
