import express from "express";
const router = express.Router();

// @route   GET api/books
// @desc    Get all books
// @access  Public
router.get("/", (req, res) => {
  res.send("Books route");
});

export default router;
