import Book from "../Models/Book.js";
import Review from "../Models/Review.js";
import User from "../Models/User.js";

// Controller function to get a user by ID
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const authoredBooks = await Book.find({ author: userId });
    const userReviews = await Review.find({ user: userId }).populate(
      "book",
      "title image"
    );

    res.json({ user, authoredBooks, userReviews });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to update a user by ID
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, bio } = req.body;
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Assuming req.user.id holds the authenticated user's ID
    if (user._id.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "User not authorized to update this profile" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, bio },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
