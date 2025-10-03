import mongoose from 'mongoose';
const { Schema } = mongoose;

const bookSchema = new Schema({
    author: { type: String, required: true, unique: true },
    title: { type: String, required: true, unique: true },
    genre: { type: String, required: true },
    publicationYear: { type: Number, required: true },
    summary: { type: String },
    ISBN: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    averageRating: { type: Number, default: 0 }
});

export default mongoose.model('Book', bookSchema);