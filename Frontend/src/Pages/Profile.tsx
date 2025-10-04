import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookList from "../Components/BookList";
import Navbar from "../Components/Navbar";
import StarRating from "../Components/StarRating";
import { UserContext } from "../Context/UserContext";
import type { Book, Review, User } from "../types";
import "./Profile.css";

interface ProfileData {
  user: User;
  authoredBooks: Book[];
  userReviews: Review[];
}

const Profile: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!userContext?.user) {
        setError("You must be logged in to view this page.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${userContext.user}`,
            },
          }
        );
        setProfileData(response.data);
      } catch (err) {
        setError("Failed to fetch profile data. Please try again later.");
        console.error("Error fetching profile data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userContext]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="profile-page">
          <p>Loading profile...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="profile-page">
          <p className="error-message">{error}</p>
        </div>
      </>
    );
  }

  if (!profileData) {
    return (
      <>
        <Navbar />
        <div className="profile-page">
          <p>No profile data available.</p>
        </div>
      </>
    );
  }

  const { user, authoredBooks, userReviews } = profileData;

  return (
    <>
      <Navbar />
      <div className="profile-page">
        <header className="profile-header">
          <img
            src={
              user.avatar ||
              `https://api.dicebear.com/8.x/micah/svg?seed=${user.username}`
            }
            alt={`${user.username}'s avatar`}
            className="profile-avatar"
          />
          <div className="profile-info">
            <h1>{user.username}</h1>
            <p>{user.email}</p>
          </div>
        </header>

        <section className="profile-section">
          <h2>Books Authored</h2>
          {authoredBooks.length > 0 ? (
            <div className="authored-books-list">
              {authoredBooks.map((book) => (
                <div key={book._id} className="authored-book-card">
                  <BookList books={[book]} />
                  <button
                    className="edit-icon-btn"
                    onClick={() => navigate(`/edit-book/${book._id}`)}
                    aria-label={`Edit ${book.title}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-message">You haven't authored any books yet.</p>
          )}
        </section>

        <section className="profile-section">
          <h2>Your Reviews</h2>
          {userReviews.length > 0 ? (
            <div className="reviews-list">
              {userReviews.map((review) => (
                <div key={review._id} className="review-card">
                  <h3 className="review-card-book-title">
                    {review.book.title}
                  </h3>
                  <div className="review-card-rating">
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="review-card-comment">{review.comment}</p>
                  <button
                    className="edit-icon-btn"
                    onClick={() => navigate(`/edit-review/${review._id}`)}
                    aria-label={`Edit your review for ${review.book.title}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-message">You haven't reviewed any books yet.</p>
          )}
        </section>
      </div>
    </>
  );
};

export default Profile;
