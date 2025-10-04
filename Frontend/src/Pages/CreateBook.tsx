import axios from "axios";
import React, { useCallback, useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { UserContext } from "../Context/UserContext";
import "./CreateBook.css";

const CreateBook: React.FC = () => {
  const [title, setTitle] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleGenreSelect = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || selectedGenres.length === 0 || !description) {
      setError("Please fill in all fields.");
      return;
    }
    if (!userContext?.user) {
      setError("You must be logged in to create a book.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    selectedGenres.forEach((genre) => {
      formData.append("genre", genre);
    });
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post("http://localhost:5000/api/books", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userContext.user}`,
        },
      });
      navigate("/books");
    } catch (err) {
      setError("Failed to create book. Please try again.");
      console.error(err);
    }
  };

  const genres = ["Fiction", "Non-Fiction", "Science", "Fantasy", "History", "Romance", "Mystery"];

  return (
    <>
      <Navbar />
      <div className="create-book-container">
        <div className="create-book-form-wrapper">
          <h1 className="create-book-title">Add a New Book</h1>
          <div className="create-book-layout">
            <div className="create-book-left">
              <div
                {...getRootProps()}
                className={`dropzone ${isDragActive ? "active" : ""}`}
              >
                <input {...getInputProps()} />
                <div className="dropzone-content">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Book preview"
                      className="image-preview"
                    />
                  ) : (
                    <>
                      <p>+ Add a Book Cover</p>
                      <span>Drag & drop or click to browse</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="create-book-right">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Book Title</label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., The Great Gatsby"
                  />
                </div>
                <div className="form-group">
                  <label>Genre</label>
                  <div className="genre-options-container">
                    {genres.map((genre) => (
                      <button
                        type="button"
                        key={genre}
                        className={`genre-option ${
                          selectedGenres.includes(genre) ? "selected" : ""
                        }`}
                        onClick={() => handleGenreSelect(genre)}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="A short summary of the book..."
                  />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="submit-btn">
                  Create Book
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateBook;
