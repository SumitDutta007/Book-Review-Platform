import React from "react";
import type { Book } from "../types";
import "./BookItem.css";

interface BookItemProps {
  book: Book;
}

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <span className="stars">
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`}>&#9733;</span>
      ))}
      {halfStar && <span>&#9734;</span>}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`}>&#9734;</span>
      ))}
    </span>
  );
};

const BookItem: React.FC<BookItemProps> = ({ book }) => {
  return (
    <div className="book-item-card">
      <img src={book.image} alt={book.title} className="book-item-image" />
      <div className="book-item-content">
        <h3 className="book-item-title">{book.title}</h3>
        <p className="book-item-author">by {book.author.username}</p>
        <div className="book-item-details">
          <div className="book-item-rating">
            {book.rating > 0 ? (
              <>
                <StarRating rating={book.rating} />
                <span className="review-count">
                  ({book.reviews.length} reviews)
                </span>
              </>
            ) : (
              <span className="not-rated">Not rated yet</span>
            )}
          </div>
          <div className="book-item-genres">
            {book.genre.map((g) => (
              <span key={g} className="book-item-genre">
                {g}
              </span>
            ))}
          </div>
        </div>
        <p className="book-item-desc">{book.description}</p>
        <button className="book-item-review-btn">Review</button>
      </div>
    </div>
  );
};

export default BookItem;
