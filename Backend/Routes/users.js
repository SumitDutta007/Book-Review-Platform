import express from "express";
import protectedRoute from "../Middleware/protected.js";
import { getUserById } from "../Controllers/userController.js";
import { updateUser } from "../Controllers/userController.js";

const router = express.Router();

// Example route to get a user by ID
router.get("/:id", protectedRoute ,getUserById);
// Update user profile route can be added here
router.put("/:id", protectedRoute, updateUser);

export default router;