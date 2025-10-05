// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || "https://book-review-platform-pjx2.onrender.com";

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${API_URL}/api/auth/login`,
  REGISTER: `${API_URL}/api/auth/register`,
  LOGOUT: `${API_URL}/api/auth/logout`,
  
  // Books
  BOOKS: `${API_URL}/api/books`,
  BOOK_BY_ID: (id: string) => `${API_URL}/api/books/${id}`,
  HIGHEST_RATED_BOOK: `${API_URL}/api/books/highest-rated`,
  
  // Reviews
  REVIEWS: `${API_URL}/api/reviews`,
  REVIEW_BY_ID: (id: string) => `${API_URL}/api/reviews/${id}`,
  
  // Users
  USER_PROFILE: `${API_URL}/api/users/profile`,
  USER_BY_ID: (id: string) => `${API_URL}/api/users/${id}`,
};
