import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { JWT_ACCESS_TOKEN } from "@/constants";

// BookPage component for rendering the book product details
export default function BookPage() {
  const router = useRouter();
  const { bookid } = router.query;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);
  const [bookDetails, setBookDetails] = useState(null);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem(JWT_ACCESS_TOKEN);
    window.location.reload();
  };

  const getUser = async () => {
    try {
      const response = await fetch("/api/getuser"); // Adjust as needed
      const data = await response.json();
      const userName = data.user.name;
      setUserName(userName);
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  const fetchBookDetails = async () => {
    if (bookid) {
      try {
        const response = await fetch(`/api/getbookdetails?bookid=${bookid}`);
        const data = await response.json();

        if (response.ok) {
          setBookDetails(data);
        } else {
          console.error('Error fetching book details:', data.error);
        }
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem(JWT_ACCESS_TOKEN);
    if (token) {
      setIsLoggedIn(true);
      getUser();
    } else {
      setIsLoggedIn(false);
      setUserName(null);
    }

    fetchBookDetails();
  }, [bookid]);

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
            <Link href="/login">
              <button>Login</button>
            </Link>
            <Link href="/signup">
              <button>Signup</button>
            </Link>
          </div>
        )}
      </nav>

      {/* Main Book Product Section */}
      <div className="container" style={styles.container}>
        {bookDetails ? (
          <div className="product-section" style={styles.productSection}>
            <div className="image" style={styles.image}>
              <img
                src={bookDetails.thumbnail} // Assuming image_url is a field in your table
                alt="Book"
                id="product-image"
                style={styles.imageTag} 
              />{/*book image*/}
            </div>
            <div className="details" style={styles.details}>
              <h1>{bookDetails.title}</h1> {/*name of book*/}
              <div className="rating" style={styles.rating}>
              <div className="rating" style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: '#555' }}>
  <span style={{ marginRight: '5px' }}>
    ★ {bookDetails.avg_rating}
  </span>
  <span>
    <br />
    <br />

    {bookDetails.ratings_count} Ratings {bookDetails.review_count} Reviews
  </span>
</div>
                <br />
                <span>Author: <strong>{bookDetails.author}</strong></span>
                <br />{/*  author */}
                <span>{bookDetails.description}</span>
              </div>
              <div className="price-section" style={styles.priceSection}>
                <p className="price" style={styles.price}>₹{bookDetails.price}</p> {/*change  price*/}
                <p className="original-price" style={styles.originalPrice}>₹{bookDetails.original_price}</p> {/*optional to change*/}
                <p className="discount" style={styles.discount}>({bookDetails.discount}% off)</p> {/*offer percent */}
              </div>
              <div className="cta-buttons" style={styles.ctaButtons}>
                <button id="add-to-cart" style={styles.addToCart}>Add to Cart</button>{/* give hyperlink to addtocart page */}
                <button id="buy-now" style={styles.buyNow}>Buy Now</button>{/* give hyperlink to payment or buy page */}
              </div>
            </div>
          </div>
        ) : (
          <p>Loading book details...</p>
        )}
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>Contact: info@bookmart.com</p>
        <p>Address: 123 Book Street, Booktown</p>
      </footer>
    </div>
  );
}

// Styles for the page components
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem",
    background: "#f4f4f4",
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    color: '#555',
  },
  logo: { fontSize: "1.5rem", fontWeight: "bold" },
  navItems: { display: "flex", gap: "1rem", listStyle: "none" },
  container: {
    width: "80%",
    margin: "20px auto",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  productSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  imageTag: {
    maxWidth: "300px",
    borderRadius: "8px",
  },
  details: { width: "60%" },
  rating: { fontSize: "14px", color: "#555" },
  priceSection: { display: "flex", alignItems: "center" },
  price: { fontSize: "28px", fontWeight: "bold", color: "#388e3c", marginRight: "10px" },
  originalPrice: { fontSize: "18px", textDecoration: "line-through", color: "#888", marginRight: "10px" },
  discount: { fontSize: "16px", color: "#d32f2f" },
  ctaButtons: { marginTop: "20px" },
  addToCart: {
    backgroundColor: "#ff9f00",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
  },
  buyNow: {
    backgroundColor: "#fb641b",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  footer: { padding: "2rem", background: "#eee", textAlign: "center" },
};
