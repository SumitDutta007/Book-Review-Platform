import React from "react";
import { useNavigate } from "react-router-dom";
import type { Book } from "../types";
import "./BookCarousel.css";

interface BookCarouselProps {
  title: string;
  books: Book[];
}

const BookCarousel: React.FC<BookCarouselProps> = ({ title, books }) => {
  const navigate = useNavigate();
  // A threshold to decide when to animate.
  // This can be adjusted based on the average screen size and book card width.
  const MIN_BOOKS_FOR_ANIMATION = 5;

  // We only animate if there are enough books to make the loop look good.
  const shouldAnimate = books.length >= MIN_BOOKS_FOR_ANIMATION;

  // Duplicate the books array for a seamless loop only if we are animating.
  const displayBooks = shouldAnimate ? [...books, ...books] : books;

  const handleBookClick = (bookId: string) => {
    navigate(`/book/${bookId}`);
  };

  return (
    <div className="book-carousel-container">
      <h2>{title}</h2>
      <div
        className={`carousel-wrapper ${shouldAnimate ? "" : "static-wrapper"}`}
      >
        <div
          className={`carousel-track ${
            shouldAnimate ? "animated-track" : "static-track"
          }`}
        >
          {displayBooks.map((book, index) => (
            <div
              key={`${book._id}-${index}`}
              className="book-card"
              onClick={() => handleBookClick(book._id)}
            >
              <img src={book.image} alt={book.title} className="book-image" />
              <div className="book-info">
                <h3>{book.title}</h3>
                <p>{book.author.username}</p>
                <p>Rating: {book.rating.toFixed(1)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookCarousel;
