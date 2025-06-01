import React, { useState, useEffect } from "react";
import "./styles.css";
import gameService from "../../api/game.js";
import { formatDate } from "../../utils/formatDate.js";
import { useTranslation } from "react-i18next";
const GameComments = () => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const commentsResponse = await gameService.getGameComments();
    console.log(commentsResponse);
    setComments(commentsResponse);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      await gameService.addGameComment({
        player: localStorage.getItem("username"),
        game: "connectFour",
        comment: commentText,
        commentedOn: new Date().toISOString(),
      });

      setCommentText("");
      fetchComments();
    }
  };

  return (
    <div className="game-comments">
      <h2>{t("comments.header")}</h2>
      <form className="comment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="commentText">{t("comments.comment")}</label>
          <textarea
            id="commentText"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder={t("comments.placeholder")}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          {t("comments.submit")}
        </button>
      </form>

      <div className="comments-list">
        {comments.map((comment, index) => (
          <div key={index} className="comment-card">
            <div className="comment-header">
              <span className="comment-player">{comment.player}</span>
              <span className="comment-date">
                {formatDate(comment.commentedOn)}
              </span>
            </div>
            <p className="comment-text">{comment.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameComments;
