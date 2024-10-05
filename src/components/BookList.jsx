// components/BookList.js
import React from 'react';
import BookCard from './BookCard';

export default function BookList() {
  const books = generateSampleBooks(); // Generate sample books here

  return (
    <div style={styles.grid}>
      {books.map((book, index) => (
        <BookCard key={index} {...book} />
      ))}
    </div>
  );
}

// Function to generate sample book data
const generateSampleBooks = () => {
  return Array.from({ length: 30 }).map((_, i) => ({
    title: `Book Title ${i + 1}`,
    author: `Author ${i + 1}`,
    rating: (Math.random() * 5).toFixed(1), // Random rating between 0.0 and 5.0
    imageUrl: `https://via.placeholder.com/100x150?text=Book+${i + 1}`, // Placeholder image
  }));
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    padding: '1rem',
  },
};
