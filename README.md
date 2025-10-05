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

### Backend
- **Node.js** with **Express.js** - Server framework
- **MongoDB** with **Mongoose** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Multer** & **Cloudinary** - Image upload and storage
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** with **TypeScript** - UI framework
- **Vite** - Build tool
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Toastify** - Toast notifications
- **CSS** - Styling (no Tailwind)

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
- `POST /api/reviews` – Add a review (requires bookId in body)
- `PUT /api/reviews/{reviewId}` – Edit your review
- `DELETE /api/reviews/{reviewId}` – Delete your review

### **Users**
- `GET /api/users/profile` – Get logged-in user's profile data
- `GET /api/users/{id}` – View user profile by ID
- `PUT /api/users/{id}` – Update user profile

---

## 🏁 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/SumitDutta007/Book-Review-Platform.git
   cd Book-Review-Platform
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   ```
   
   Create a `.env` file in the `Backend` directory (see `.env.example` for template):
   ```env
   PORT=5000
   URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   FRONTEND_URL=http://localhost:5173
   NODE_ENV=development
   ```

3. **Frontend Setup**
   ```bash
   cd ../Frontend
   npm install
   ```
   
   Create a `.env` file in the `Frontend` directory (see `.env.example` for template):
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. **Run the application**
   
   **Backend:**
   ```bash
   cd Backend
   npm start
   # or for development
   node app.js
   ```
   
   **Frontend** (in a new terminal):
   ```bash
   cd Frontend
   npm run dev
   ```

5. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000/api`

---

## 🌐 Deployment

- **Live Frontend:** [https://book-review-platform-git-main-sumitdutta007s-projects.vercel.app](https://book-review-platform-git-main-sumitdutta007s-projects.vercel.app)
- **Live Backend API:** [https://book-review-platform-pjx2.onrender.com](https://book-review-platform-pjx2.onrender.com)

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🌟 Features in Detail

- ✅ **User Authentication:** Secure JWT-based authentication
- ✅ **Book Management:** Create, read, update, and delete books
- ✅ **Review System:** One review per user per book with star ratings
- ✅ **Automatic Rating Calculation:** Book ratings update automatically
- ✅ **Image Upload:** Cloudinary integration for book cover images
- ✅ **Responsive Design:** Mobile-friendly UI with hamburger menus
- ✅ **Genre Filtering:** Browse books by multiple genres
- ✅ **Search Functionality:** Find books by title, author, or rating
- ✅ **Toast Notifications:** User-friendly feedback for all actions
- ✅ **Protected Routes:** Secure pages requiring authentication

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

> Made with ❤️ by [SumitDutta007](https://github.com/SumitDutta007)
