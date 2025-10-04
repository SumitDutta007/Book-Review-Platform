import mongoose from "mongoose";
const { Schema } = mongoose;

const bookSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  genre: { type: [String], required: true },
  description: { type: String },
  image: { type: String },
  rating: { type: Number, default: 0 },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  createdAt: { type: Date, default: Date.now },
});

// By default, Mongoose automatically creates a unique index for fields named 'author' if not specified otherwise.
// We are overriding this behavior by creating a non-unique index on 'author'.
bookSchema.index({ author: 1 }, { unique: false });

export default mongoose.model("Book", bookSchema);
