import express from "express";
import {
  getUserById,
  getUserProfile,
  updateUser,
} from "../Controllers/userController.js";
import protectedRoute from "../Middleware/protected.js";

const router = express.Router();

// Route to get all profile data for the logged-in user
router.get("/profile", protectedRoute, getUserProfile);

// Example route to get a user by ID
router.get("/:id", protectedRoute, getUserById);
// Update user profile route can be added here
router.put("/:id", protectedRoute, updateUser);

export default router;
