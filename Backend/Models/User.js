import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // You can add author-specific fields here
  // For example, a biography or a list of published books
  bio: {
    type: String,
  },
  booksPublished: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
  ratingsGiven: [
    {
      type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
    },
  ],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", UserSchema);