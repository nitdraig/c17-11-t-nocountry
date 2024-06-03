import { useState } from "react";

type stars={
    totalStars:unknown
}

const StarRating = ({ totalStars }:stars) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseOver = (hoveredStar:number) => {
    setHoverRating(hoveredStar);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (selectedStar:number) => {
    setRating(selectedStar);
  };

  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill={(hoverRating >= starValue || rating >= starValue) ? "#FBBF24" : "none"}
            stroke="#000000"
            strokeWidth="2"
            onMouseOver={() => handleMouseOver(starValue)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starValue)}
            className="w-6 h-6 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.393 7.575l-6.822-.574L10.01.812c-.2-.443-.8-.443-1 0l-2.56 6.189-6.822.574a.75.75 0 00-.416 1.283l5.227 4.532-1.504 6.799a.75.75 0 001.088.815L10 16.24l6.34 3.63a.75.75 0 001.088-.815l-1.504-6.799 5.227-4.532a.75.75 0 00-.416-1.283z"
            />
          </svg>
        );
      })}
    </div>
  );
};

export default StarRating;
