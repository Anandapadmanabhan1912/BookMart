// components/BookCard.js
import React from "react";

export default function BookCard({
  title,
  author,
  thumbnail,
  price,
  avg_rating,
}) {
  return (
    <div style={styles.card}>
      <img src={thumbnail} alt={title} style={styles.image} />
      <h3>{title}</h3>
      <p>by {author}</p>
      <p>Rating: {avg_rating} ⭐</p>
      <p>Rs. {price}</p>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    padding: "1rem",
    borderRadius: "8px",
    width: "200px",
    textAlign: "center",
  },
  image: { width: "100px", height: "150px", objectFit: "cover" },
};
