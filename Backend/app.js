import cors from "cors";
import express from "express";
import { MongoConnect } from "./lib/MongoConnect.js";
import auth from "./Routes/auth.js";
import books from "./Routes/books.js";
import reviews from "./Routes/reviews.js";
import users from "./Routes/users.js";

const app = express();
const port = process.env.PORT || 5000;

// Allowed origins for CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://book-review-platform-git-main-sumitdutta007s-projects.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

// Middleware
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/books", books);
app.use("/api/reviews", reviews);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
// MongoDB connection
MongoConnect();
