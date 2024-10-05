// pages/signup.js
import { useState } from 'react';
import styles from './Auth.module.css'; // Reuse the same CSS module
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('male'); // Default gender
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    // Handle signup logic here
  };

  const handleGoogleSignup = () => {
    // Handle Google signup logic here
  };

  const handleFacebookSignup = () => {
    // Handle Facebook signup logic here
  };

  return (
    <div className={styles.container}>
      <img src="/logo.png" alt="logo" width="40" height="40"/>
      <h2 className={styles.title}>
      Create an Account</h2>
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
        <button type="submit" className={styles.button}>Sign Up</button>
      </form>
      <p className={styles.p}>or
      <button className={`${styles.button_signup}`} onClick={handleGoogleSignup}>
      <FontAwesomeIcon icon={faGoogle} className={styles.icon} />
        Sign Up with Google
      </button>
      <button className={`${styles.button_signup}`} onClick={handleFacebookSignup}>
      <FontAwesomeIcon icon={faFacebook} className={styles.icon} /> Sign Up with Facebook
      </button>
        Already have an account? <a href="/login" className={styles.link}>Login</a>
      </p>
    </div>
  );
}
