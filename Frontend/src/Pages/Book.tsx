import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BookList from "../Components/BookList";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import type { Book as BookType } from "../types";
import "./Book.css";

const Book: React.FC = () => {
  const [books, setBooks] = useState<BookType[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<BookType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [authorSearch, setAuthorSearch] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.genre) {
      setSelectedGenres([location.state.genre]);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/books");
        setBooks(response.data);
      } catch (err) {
        setError("Failed to fetch books. Please try again later.");
        console.error("Error fetching books:", err);
      }
    };
    fetchBooks();
  }, []);

  const handleGenreChange = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  useEffect(() => {
    let tempBooks = [...books];

    if (searchTerm) {
      tempBooks = tempBooks.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedGenres.length > 0) {
      tempBooks = tempBooks.filter((book) =>
        selectedGenres.some((g) => book.genre.includes(g))
      );
    }

    if (authorSearch) {
      tempBooks = tempBooks.filter(
        (book) =>
          typeof book.author !== "string" &&
          book.author.username
            .toLowerCase()
            .includes(authorSearch.toLowerCase())
      );
    }

    if (rating > 0) {
      tempBooks = tempBooks.filter((book) => book.rating >= rating);
    }

    setFilteredBooks(tempBooks);
  }, [searchTerm, selectedGenres, authorSearch, rating, books]);

  return (
    <>
      <Navbar />
      <div className="book-page-container">
        <Sidebar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedGenres={selectedGenres}
          handleGenreChange={handleGenreChange}
          authorSearch={authorSearch}
          setAuthorSearch={setAuthorSearch}
          rating={rating}
          setRating={setRating}
        />
        <main className="book-content">
          {error && <p className="error-message">{error}</p>}
          <BookList books={filteredBooks} />
        </main>
      </div>
    </>
  );
};

export default Book;
