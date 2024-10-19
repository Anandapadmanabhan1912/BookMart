import React, { useState } from "react";
import { useRouter } from 'next/router';

export default function BookCard({
  bookid,
  title,
  author,
  thumbnail,
  price,
  avg_rating,
}) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false); // State for hover effect

  const handleClick = () => {
    router.push(`/bookdetail/${bookid}`); // Redirect to book details page
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      style={{
        ...styles.card,
        ...(isHovered ? styles.cardHover : {}), // Apply hover styles conditionally
      }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={thumbnail} alt={title} style={styles.image} />
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.author}>by {author}</p>
      <p style={styles.rating}>Rating: {avg_rating} ⭐</p>
      <p style={styles.price}>Rs. {price}</p>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    padding: "1rem",
    borderRadius: "12px",
    width: "200px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add shadow for depth
    cursor: "pointer", // Make it clickable
    transition: "transform 0.2s, box-shadow 0.2s", // Smooth hover effect
  },
  image: {
    width: "120px",
    height: "180px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  title: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#333", // Darker text for contrast
  },
  author: {
    fontSize: "0.9rem",
    color: "#555",
    marginBottom: "8px",
  },
  rating: {
    fontSize: "0.9rem",
    color: "#0070f3", // Blue text for rating
    marginBottom: "8px",
  },
  price: {
    fontSize: "1rem",
    color: "#08bf39", // Green color for price
    fontWeight: "bold",
  },
  cardHover: {
    transform: "scale(1.05)", // Slightly larger on hover
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // More intense shadow on hover
  },
};
