import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../Components/Navbar";
import { UserContext } from "../Context/UserContext";
import "./Book.css";

interface IUser {
  _id: string;
  username: string;
}

interface IReview {
  _id: string;
  user: IUser;
  comment: string;
  rating: number;
  createdAt: string;
}

interface IBook {
  _id: string;
  title: string;
  author: IUser;
  image: string;
  isbn: string;
  description: string;
  genre: string;
  reviews: IReview[];
}

const Book: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<IBook | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editedReviewText, setEditedReviewText] = useState("");
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(0);
  const userContext = useContext(UserContext);
  const user = userContext?.user as IUser | null;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://book-review-platform-pjx2.onrender.com/api/books/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBook(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book:", error);
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleEditReview = (review: IReview) => {
    setEditingReviewId(review._id);
    setEditedReviewText(review.comment);
  };

  const handleUpdateReview = async (reviewId: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://book-review-platform-pjx2.onrender.com/api/reviews/${reviewId}`,
        { comment: editedReviewText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBook((prevBook) => {
        if (!prevBook) return null;
        const updatedReviews = prevBook.reviews.map((review) =>
          review._id === reviewId ? response.data : review
        );
        return { ...prevBook, reviews: updatedReviews };
      });
      setEditingReviewId(null);
      toast.success("Review updated successfully!");
    } catch (error) {
      console.error("Error updating review:", error);
      toast.error("Failed to update review. Please try again.");
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewText || newReviewRating === 0) {
      toast.warning("Please provide a review and a rating.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `https://book-review-platform-pjx2.onrender.com/api/reviews`,
        {
          bookId: id,
          comment: newReviewText,
          rating: newReviewRating,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBook((prevBook) => {
        if (!prevBook) return null;
        return { ...prevBook, reviews: [...prevBook.reviews, response.data] };
      });
      setNewReviewText("");
      setNewReviewRating(0);
      toast.success("Review added successfully!");
    } catch (error) {
      console.error("Error adding review:", error);
      let errorMessage = "Failed to add review. Please try again.";

      if (axios.isAxiosError(error) && error.response?.data) {
        // Try both 'message' and 'msg' properties
        errorMessage =
          error.response.data.message ||
          error.response.data.msg ||
          errorMessage;
      }

      // Check if it's a duplicate review error
      if (
        errorMessage.toLowerCase().includes("already reviewed") ||
        errorMessage.toLowerCase().includes("duplicate")
      ) {
        toast.error("You have already reviewed this book!");
      } else {
        toast.error(errorMessage);
      }
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading Book...</p>
        </div>
      </>
    );
  }

  if (!book) {
    return (
      <>
        <Navbar />
        <div className="error-container">
          <h2>Book not found.</h2>
          <button onClick={() => navigate("/books")} className="btn">
            Back to Books
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="book-detail-container">
        <div className="book-detail-card">
          <div className="book-detail-header">
            <img
              src={book.image}
              alt={book.title}
              className="book-detail-cover"
            />
            <div className="book-detail-info">
              <h1 className="book-detail-title">{book.title}</h1>
              <h2 className="book-detail-author">by {book.author.username}</h2>
              <p className="book-detail-meta">
                <strong>Genre:</strong> {book.genre}
              </p>
              <p className="book-detail-meta">
                <strong>Rating:</strong>{" "}
                {book.reviews.length > 0
                  ? (
                      book.reviews.reduce(
                        (acc, review) => acc + review.rating,
                        0
                      ) / book.reviews.length
                    ).toFixed(1)
                  : "N/A"}{" "}
                / 5
              </p>
            </div>
          </div>
          <div className="book-detail-body">
            <h3>Description</h3>
            <p>{book.description}</p>
          </div>
        </div>

        <div className="add-review-section">
          <h3>Write a Review</h3>
          <form onSubmit={handleAddReview} className="add-review-form">
            <textarea
              value={newReviewText}
              onChange={(e) => setNewReviewText(e.target.value)}
              placeholder="Share your thoughts..."
              className="add-review-textarea"
              required
            />
            <div className="add-review-actions">
              <div className="star-rating">
                {[...Array(5)].map((_, index) => {
                  const ratingValue = index + 1;
                  return (
                    <button
                      type="button"
                      key={ratingValue}
                      className={ratingValue <= newReviewRating ? "on" : "off"}
                      onClick={() => setNewReviewRating(ratingValue)}
                    >
                      <span className="star">&#9733;</span>
                    </button>
                  );
                })}
              </div>
              <button type="submit" className="btn-submit-review">
                Submit Review
              </button>
            </div>
          </form>
        </div>

        <div className="reviews-section">
          <h3>Reviews</h3>
          {book.reviews.length > 0 ? (
            book.reviews.map((review) => (
              <div key={review._id} className="review-card">
                {editingReviewId === review._id ? (
                  <div className="review-edit-form">
                    <textarea
                      value={editedReviewText}
                      onChange={(e) => setEditedReviewText(e.target.value)}
                      className="review-edit-textarea"
                    />
                    <div className="review-edit-actions">
                      <button
                        onClick={() => handleUpdateReview(review._id)}
                        className="btn-save"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingReviewId(null)}
                        className="btn-cancel"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="review-header">
                      <strong>{review.user.username}</strong>
                      <span className="review-date">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="review-rating">
                      {[...Array(5)].map((_, index) => (
                        <span
                          key={index}
                          className={
                            index < review.rating ? "star filled" : "star"
                          }
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="review-text">{review.comment}</p>
                    {user && user._id === review.user._id && (
                      <button
                        onClick={() => handleEditReview(review)}
                        className="btn-edit-review"
                      >
                        Edit
                      </button>
                    )}
                  </>
                )}
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to write one!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Book;
