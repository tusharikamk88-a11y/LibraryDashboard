"use client";

function BookCard({ book }) {
  const title = book.title || "Unknown Title";
  const author = book.author || "Unknown Author";
  const available = Boolean(book.available);

  return (
    <div className="book-card">
      <div className="book-title">{title}</div>
      <div className="book-author">by {author}</div>
      {available ? (
        <div className="book-available">✅ Available</div>
      ) : (
        <div className="book-unavailable">❌ Checked Out</div>
      )}
    </div>
  );
}

export default function BookGrid({ books, searchQuery }) {
  const query = (searchQuery || "").toLowerCase();
  const filtered = query
    ? books.filter(
        (b) =>
          String(b.title || "").toLowerCase().includes(query) ||
          String(b.author || "").toLowerCase().includes(query)
      )
    : books;

  if (filtered.length === 0) {
    return <div className="info-box">No books match your search. Try a different keyword!</div>;
  }

  return (
    <div className="book-grid">
      {filtered.map((book, i) => (
        <BookCard key={i} book={book} />
      ))}
    </div>
  );
}
