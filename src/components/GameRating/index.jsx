import React, { useEffect, useState } from "react";
import "./styles.css";
import gameService from "../../api/game.js";
import { useTranslation } from "react-i18next";
const GameRating = () => {
  const [hoverRating, setHoverRating] = useState(0);
  const [rating, setRating] = useState(0);
  const [currentPlayerRating, setCurrentPlayerRating] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    fetchRating();
  }, []);

  const fetchRating = async () => {
    const rating = await gameService.getGameRating();
    const currentPlayerRating = await gameService.getCurrentPlayerRating(
      localStorage.getItem("username")
    );
    setRating(rating);
    setCurrentPlayerRating(currentPlayerRating);
  };

  const maxStars = 5;

  const handleStarClick = async (starValue) => {
    await gameService.addGameRating({
      player: localStorage.getItem("username"),
      game: "connectFour",
      rating: starValue,
      ratedOn: new Date().toISOString(),
    });

    setCurrentPlayerRating(starValue);
    fetchRating();
  };

  const handleStarHover = (starValue) => {
    setHoverRating(starValue);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const renderStars = (rating, isSelectable = true) => {
    return [...Array(maxStars)].map((_, index) => {
      const starValue = index + 1;
      const isFilled =
        starValue <= rating || (isSelectable && starValue <= hoverRating);
      if (isSelectable) {
        return (
          <span
            key={index}
            className={`star ${isFilled ? "filled" : ""}`}
            onClick={() => handleStarClick(starValue)}
            onMouseEnter={() => handleStarHover(starValue)}
            onMouseLeave={handleMouseLeave}
          >
            {isFilled ? "★" : "☆"}
          </span>
        );
      } else {
        return (
          <span key={index} className={`star ${isFilled ? "filled" : ""}`}>
            {isFilled ? "★" : "☆"}
          </span>
        );
      }
    });
  };

  return (
    <div className="game-rating">
      <div className="player-rating">
        <h2>{t("gameRating.rateGame")} : </h2>
      </div>
      <div className="rating-stars">
        <h3>{t("gameRating.yourRating")} : </h3>
        {renderStars(currentPlayerRating)}
      </div>
      <div className="rating-value">
        {currentPlayerRating.toFixed(1)} / {maxStars}
      </div>
      <div className="rating-stars">
        <h3>{t("gameRating.averageRating")} : </h3>
        {renderStars(rating, false)}
      </div>
      <div className="rating-value">
        {rating.toFixed(1)} / {maxStars}
      </div>
    </div>
  );
};

export default GameRating;
