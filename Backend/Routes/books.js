import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  getHighestRatedBookOfMonth,
  updateBook,
} from "../Controllers/bookController.js";
import { upload } from "../Middleware/multer.js";
import protectedRoute from "../Middleware/protected.js";

const router = express.Router();

router.get("/", getAllBooks);
router.get("/highest-rated", protectedRoute, getHighestRatedBookOfMonth);
router.post(
  "/",
  protectedRoute,
  protectedRoute,
  upload.single("image"),
  createBook
);
router.get("/:id", protectedRoute, getBookById);
router.put("/:id", protectedRoute, upload.single("image"), updateBook);
router.delete("/:id", protectedRoute, deleteBook);

export default router;
