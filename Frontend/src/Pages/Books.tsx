import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BookList from "../Components/BookList";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import type { Book as BookType } from "../types";
import "./Books.css";

const Books: React.FC = () => {
  const [books, setBooks] = useState<BookType[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<BookType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [authorSearch, setAuthorSearch] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="book-page-container">
        {/* Overlay for mobile */}
        <div
          className={`sidebar-overlay ${isSidebarOpen ? "active" : ""}`}
          onClick={closeSidebar}
        />

        {/* Sidebar with active class for mobile */}
        <aside className={isSidebarOpen ? "active" : ""}>
          <Sidebar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedGenres={selectedGenres}
            handleGenreChange={handleGenreChange}
            authorSearch={authorSearch}
            setAuthorSearch={setAuthorSearch}
            rating={rating}
            setRating={setRating}
            onClose={closeSidebar}
          />
        </aside>

        <main className="book-content">
          {error && <p className="error-message">{error}</p>}
          <BookList books={filteredBooks} />
        </main>

        {/* Filter toggle button for mobile */}
        <button
          className="filter-toggle-btn"
          onClick={toggleSidebar}
          aria-label="Toggle filters"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" y1="21" x2="4" y2="14" />
            <line x1="4" y1="10" x2="4" y2="3" />
            <line x1="12" y1="21" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12" y2="3" />
            <line x1="20" y1="21" x2="20" y2="16" />
            <line x1="20" y1="12" x2="20" y2="3" />
            <line x1="1" y1="14" x2="7" y2="14" />
            <line x1="9" y1="8" x2="15" y2="8" />
            <line x1="17" y1="16" x2="23" y2="16" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Books;
