import React from "react";
import "./StarRating.css";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5 }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = maxRating - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="star-rating">
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className="star full-star">
          ★
        </span>
      ))}
      {halfStar && <span className="star half-star">★</span>}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="star empty-star">
          ☆
        </span>
      ))}
    </div>
  );
};

export default StarRating;
