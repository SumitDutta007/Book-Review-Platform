import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookCarousel from "../Components/BookCarousel";
import BookSummary from "../Components/BookSummary";
import Footer from "../Components/Footer";
import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";
import { UserContext } from "../Context/UserContext";
import type { Book } from "../types";

const Home = () => {
  const [topRatedBooks, setTopRatedBooks] = useState<Book[]>([]);
  const [fictionBooks, setFictionBooks] = useState<Book[]>([]);
  const userContext = useContext(UserContext);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!userContext || !userContext.user) {
        return;
      }
      try {
        const response = await axios.get("http://localhost:5000/api/books", {
          headers: {
            Authorization: `Bearer ${userContext.user}`,
          },
        });
        const books: Book[] = response.data;

        // Top Rated Books
        const sortedByRating = [...books].sort((a, b) => b.rating - a.rating);
        setTopRatedBooks(sortedByRating);

        // Fiction Books
        const fiction = books.filter((book) => book.genre.includes("Fiction"));
        const sortedFiction = [...fiction].sort((a, b) => b.rating - a.rating);
        setFictionBooks(sortedFiction);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [userContext]);

  return (
    <>
      <Navbar />
      <Hero />
      <BookSummary />
      <div className="browse-all-container text-lg">
        <Link to="/books" className="browse-all-link">
          Browse all categories &rarr;
        </Link>
      </div>
      <BookCarousel title="Top Rated Books" books={topRatedBooks} />
      <BookCarousel title="Fiction Picks" books={fictionBooks} />
      <Footer />
    </>
  );
};

export default Home;
