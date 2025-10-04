import Book from "../Models/Book.js";
import Review from "../Models/Review.js";

// Helper function to update book rating
const updateBookRating = async (bookId) => {
  const book = await Book.findById(bookId).populate("reviews");
  if (book) {
    const totalRating = book.reviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    book.rating =
      book.reviews.length > 0 ? totalRating / book.reviews.length : 0;
    await book.save();
  }
};

// Controller function to add a review to a book
export const addReview = async (req, res) => {
  const { bookId, rating, comment } = req.body;
  const userId = req.user.id;

  try {
    // Check if the user has already reviewed this book
    const existingReview = await Review.findOne({
      book: bookId,
      user: userId,
    });
    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this book." });
    }

    // 1. Create and save the new review
    const newReview = new Review({
      book: bookId,
      user: userId,
      rating,
      comment,
    });
    await newReview.save();

    // 2. Find the book and add the new review's ID to its reviews array
    const book = await Book.findById(bookId);
    if (!book) {
      // If book not found, clean up the created review
      await Review.findByIdAndDelete(newReview._id);
      return res.status(404).json({ message: "Book not found" });
    }
    book.reviews.push(newReview._id);
    await book.save();

    // 3. Update the book's average rating
    await updateBookRating(bookId);

    // 4. Populate the user details for the new review and send it back
    const populatedReview = await Review.findById(newReview._id).populate(
      "user",
      "username"
    );

    res.status(201).json(populatedReview);
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to edit a review
export const updateReview = async (req, res) => {
  const { reviewId } = req.params;
  const { rating, comment } = req.body;
  const userId = req.user.id;

  try {
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "User not authorized to edit this review" });
    }

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;

    await review.save();

    // Update the book's average rating
    await updateBookRating(review.book);

    const populatedReview = await Review.findById(reviewId).populate(
      "user",
      "username"
    );

    res.json(populatedReview);
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to delete a review
export const deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.user.id;

  try {
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "User not authorized to delete this review" });
    }

    const bookId = review.book;

    // Delete the review document itself
    await Review.findByIdAndDelete(reviewId);

    // Find the book and remove the review reference
    await Book.findByIdAndUpdate(bookId, {
      $pull: { reviews: reviewId },
    });

    // Update the book's average rating
    await updateBookRating(bookId);

    res.json({ message: "Review deleted successfully", reviewId });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
