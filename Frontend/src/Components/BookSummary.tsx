import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import type { Book } from "../types";
import "./BookSummary.css";

const BookSummary: React.FC = () => {
  const [highestRatedBook, setHighestRatedBook] = useState<Book | null>(null);
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHighestRatedBook = async () => {
      if (!userContext || !userContext.user) {
        return;
      }
      try {
        const response = await axios.get(
          "http://localhost:5000/api/books/highest-rated",
          {
            headers: {
              Authorization: `Bearer ${userContext.user}`,
            },
          }
        );
        setHighestRatedBook(response.data);
      } catch (error) {
        console.error("Error fetching highest rated book:", error);
      }
    };

    fetchHighestRatedBook();
  }, [userContext]);

  const handleBrowseGenre = (genre: string) => {
    navigate("/books", { state: { genre } });
  };

  return (
    <section className="book-summary-section">
      {/* Highest Rated Book Banner */}
      {highestRatedBook && (
        <div className="book-banner">
          <div className="book-banner-img-wrap">
            <img
              src={highestRatedBook.image}
              alt={highestRatedBook.title}
              className="book-banner-img"
            />
          </div>
          <div className="book-banner-content">
            <h2 className="book-banner-title">
              Top Rated: {highestRatedBook.title}
            </h2>
            <p className="book-banner-desc">
              Rated {highestRatedBook.rating.toFixed(1)}/5
            </p>
            <button
              className="book-banner-btn"
              onClick={() => navigate(`/book/${highestRatedBook._id}`)}
            >
              Read Review
            </button>
          </div>
        </div>
      )}

      {/* Fiction & Non-Fiction Side by Side */}
      <div className="book-summary-bottom">
        <div className="book-summary-promo fiction-promo">
          <div className="book-summary-promo-content">
            <h3 className="book-summary-promo-title">Fiction Books</h3>
            <button
              className="book-summary-promo-btn"
              onClick={() => handleBrowseGenre("Fiction")}
            >
              Browse Fiction
            </button>
          </div>
        </div>
        <div className="book-summary-promo nonfiction-promo">
          <div className="book-summary-promo-content">
            <h3 className="book-summary-promo-title">Non-Fiction Books</h3>
            <button
              className="book-summary-promo-btn"
              onClick={() => handleBrowseGenre("Non-Fiction")}
            >
              Browse Non-Fiction
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookSummary;
