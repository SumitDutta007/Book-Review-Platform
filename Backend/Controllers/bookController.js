import Book from "../Models/Book.js";
import { uploadOnCloudinary } from "../lib/cloudinary.js";

// Controller function to get all books
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("author", "username");
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to create a new book
export const createBook = async (req, res) => {
  const { title, description, genre } = req.body;
  const imagePath = req.file?.path;
  let imageUrl;

  try {
    if (imagePath) {
      const image = await uploadOnCloudinary(imagePath);
      if (image) {
        imageUrl = image.url;
      }
    }

    const newBook = new Book({
      title,
      author: req.user.id,
      description,
      genre,
      image: imageUrl,
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to get a book by ID
export const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to update a book by ID
export const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, description } = req.body;

  try {
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Assuming req.user.id holds the authenticated user's ID
    if (book.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "User not authorized to update this book" });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, description },
      { new: true }
    );

    res.json(updatedBook);
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to delete a book by ID
export const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Assuming req.user.id holds the authenticated user's ID
    if (book.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "User not authorized to delete this book" });
    }

    await Book.findByIdAndDelete(id);

    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getHighestRatedBookOfMonth = async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    let book = await Book.findOne({
      createdAt: { $gte: thirtyDaysAgo },
    }).sort({ rating: -1 });

    if (!book) {
      book = await Book.findOne().sort({ rating: -1 });
    }

    res.json(book);
  } catch (error) {
    console.error("Error fetching highest rated book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
