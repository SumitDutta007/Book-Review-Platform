import express from "express";
import {
  addReview,
  deleteReview,
  updateReview,
} from "../Controllers/reviewController.js";
import protectedRoute from "../Middleware/protected.js";

const router = express.Router();

router.post("/", protectedRoute, addReview);
router.put("/:reviewId", protectedRoute, updateReview);
router.delete("/:reviewId", protectedRoute, deleteReview);

export default router;
