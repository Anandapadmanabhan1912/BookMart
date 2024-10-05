// components/BookCard.js
import React from 'react';

export default function BookCard({ title, author, rating, imageUrl }) {
  return (
    <div style={styles.card}>
      <img src={imageUrl} alt={title} style={styles.image} />
      <h3>{title}</h3>
      <p>by {author}</p>
      <p>Rating: {rating} ⭐</p>
    </div>
  );
}

const styles = {
  card: { border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', width: '200px', textAlign: 'center' },
  image: { width: '100px', height: '150px', objectFit: 'cover' }
};
