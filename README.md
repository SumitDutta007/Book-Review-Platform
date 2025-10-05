# 📚 Book Review Platform

Welcome to the **Book Review Platform** – a modern, feature-rich web application for discovering, reviewing, and sharing books. Built for book lovers and developers who care about clean code and robust APIs.

---

## 🚀 Features

- **User Authentication:** Secure sign-up, login, and JWT-based sessions
- **Book Catalog:** Browse, search, and filter books by genre, author, or title
- **Review System:** Add, edit, and view reviews with ratings
- **User Profiles:** Personalized dashboards and review history
- **API-first:** RESTful API for easy integration and scalability
- **Responsive UI:** Looks great on desktop and mobile devices

---

## 🛠️ Technologies & Frameworks Used

- **TypeScript** (primary language)
- Node.js/Express, React, MongoDB
- TailwindCSS CSS
- JWT, bcrypt, multer and other security modules

---

## 📚 API Endpoints

> Replace `{id}` with the appropriate book or user identifier.

### **Authentication**
- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Authenticate and receive JWT

### **Books**
- `GET /api/books` – List all books
- `GET /api/books/{id}` – Get details for a specific book
- `POST /api/books` – Add a new book
- `PUT /api/books/{id}` – Edit book details
- `DELETE /api/books/{id}` – Remove a book

### **Reviews**
- `GET /api/books/{id}/reviews` – List reviews for a book
- `POST /api/books/{id}/reviews` – Add a review
- `PUT /api/reviews/{reviewId}` – Edit your review
- `DELETE /api/reviews/{reviewId}` – Delete your review

### **Users**
- `GET /api/users/{id}` – View user profile and reviews

---

## 🏁 Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/SumitDutta007/Book-Review-Platform.git
   cd Book-Review-Platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env` and fill out required values (DB, JWT secret, etc.)

4. **Run the app**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Access**
   - API: `http://localhost:3000/api`
   - Frontend: `http://localhost:3000/`

---

## 🌟 Extra Goodies

- **Well-documented codebase** with clear comments
- **Extensible architecture** for easy feature addition
- **Unit and integration tests** (if present, mention coverage)
- **Open to contributions!** Check issues or create a pull request

---

> Made with ❤️ by [SumitDutta007](https://github.com/SumitDutta007)
