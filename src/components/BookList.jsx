// components/BookList.js
import BookCard from "./BookCard";

export default function BookList({ books, loading }) {
  if (loading) return <p>Loading...</p>; // Loading state

  return (
    <div style={styles.grid}>
      {books.length === 0 ? (
        <div>No matching books found</div>
      ) : (
        books.map((book) => <BookCard key={book.bookid} {...book} />)
      )}
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1rem",
    padding: "1rem",
  },
};
