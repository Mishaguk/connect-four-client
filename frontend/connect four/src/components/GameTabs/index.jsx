import React, { useState } from "react";
import GameScores from "../GameScores/index.jsx";
import GameComments from "../GameComments/index.jsx";
import GameRating from "../GameRating/index.jsx";
import "./styles.css";
import { useTranslation } from "react-i18next";
const GameTabs = () => {
  const [activeTab, setActiveTab] = useState("scores");
  const { t } = useTranslation();

  return (
    <div className="game-tabs">
      <div className="tabs-header">
        <button
          className={`tab-button ${activeTab === "scores" ? "active" : ""}`}
          onClick={() => setActiveTab("scores")}
        >
          {t("tabs.scores")}
        </button>
        <button
          className={`tab-button ${activeTab === "comments" ? "active" : ""}`}
          onClick={() => setActiveTab("comments")}
        >
          {t("tabs.comments")}
        </button>
        <button
          className={`tab-button ${activeTab === "rating" ? "active" : ""}`}
          onClick={() => setActiveTab("rating")}
        >
          {t("tabs.rating")}
        </button>
      </div>
      <div className="tabs-content">
        {activeTab === "scores" && <GameScores />}
        {activeTab === "comments" && <GameComments />}
        {activeTab === "rating" && <GameRating />}
      </div>
    </div>
  );
};

export default GameTabs;
