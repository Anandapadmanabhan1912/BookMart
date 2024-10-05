// components/BookList.js
import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';
import { supabase } from '../lib/supabaseClient'; // Adjust the path as necessary

export default function BookList() {
  const [books, setBooks] = useState([]); // State to hold book data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await supabase
        .from('books_mastertable') // Your table name
        .select('*'); // Fetch all fields

      if (error) {
        console.error('Error fetching books:', error);
      } else {
        setBooks(data);
      }
      setLoading(false);
    };

    fetchBooks();
  }, []); // Run once when component mounts

  if (loading) return <p>Loading...</p>; // Loading state

  return (
    <div style={styles.grid}>
      {books.map((book) => (
        <BookCard key={book.bookid} {...book} />
      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    padding: '1rem',
  },
};
