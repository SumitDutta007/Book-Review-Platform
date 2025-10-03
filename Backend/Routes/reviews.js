import express from "express";
const router = express.Router();

// @route   POST api/reviews
// @desc    Add a review for a book
// @access  Public
router.post("/", (req, res) => {
  res.send("Reviews route");
});

export default router;
