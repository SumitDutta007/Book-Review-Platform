import React from "react";
import type { Book } from "../types";
import BookItem from "./BookItem";
import "./BookList.css";

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <div className="book-list">
      {books.map((book) => (
        <BookItem key={book._id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
