import React from "react";
import CollapsibleFilter from "./CollapsibleFilter";
import "./Sidebar.css";

interface SidebarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedGenres: string[];
  handleGenreChange: (genre: string) => void;
  authorSearch: string;
  setAuthorSearch: (author: string) => void;
  rating: number;
  setRating: (rating: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  searchTerm,
  setSearchTerm,
  selectedGenres,
  handleGenreChange,
  authorSearch,
  setAuthorSearch,
  rating,
  setRating,
}) => {
  const genres = ["Fiction", "Non-Fiction", "Science", "Fantasy", "History"];

  return (
    <aside className="sidebar">
      <div className="sidebar-search">
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="sidebar-filters">
        <h3 className="filters-main-title">Filter</h3>
        <CollapsibleFilter title="Genre">
          {genres.map((genre) => (
            <div key={genre} className="checkbox-item">
              <input
                type="checkbox"
                id={genre}
                value={genre}
                checked={selectedGenres.includes(genre)}
                onChange={() => handleGenreChange(genre)}
              />
              <label htmlFor={genre}>{genre}</label>
            </div>
          ))}
        </CollapsibleFilter>
        <CollapsibleFilter title="Author">
          <div className="author-search-input">
            <input
              type="text"
              placeholder="Search author..."
              value={authorSearch}
              onChange={(e) => setAuthorSearch(e.target.value)}
            />
          </div>
        </CollapsibleFilter>
        <div className="rating-filter">
          <h4 className="rating-title">Min Rating</h4>
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="rating-slider"
          />
          <div className="rating-value">{rating.toFixed(1)} Stars</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
