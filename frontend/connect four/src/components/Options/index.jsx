import React from "react";
import "./styles.css";
import { FIELD_SIZES } from "./constants.js";
import { useTranslation } from "react-i18next";
const Options = ({
  fieldSize,
  setFieldSize,
  playWithBot,
  setPlayWithBot,
  difficulty,
  setDifficulty,
  onStartGame,
}) => {
  const { t } = useTranslation();

  return (
    <div className="options-container">
      <h2>{t("options.header")}</h2>

      <div className="options-section">
        <h3>{t("options.fieldSize")}</h3>
        <div className="size-options">
          <button
            className={`size-button ${
              fieldSize.rows === FIELD_SIZES.SMALL.rows ? "active" : ""
            }`}
            onClick={() => setFieldSize(FIELD_SIZES.SMALL)}
          >
            {t("options.small")} (5x5)
          </button>
          <button
            className={`size-button ${
              fieldSize.rows === FIELD_SIZES.MEDIUM.rows ? "active" : ""
            }`}
            onClick={() => setFieldSize(FIELD_SIZES.MEDIUM)}
          >
            {t("options.medium")} (6x7)
          </button>
          <button
            className={`size-button ${
              fieldSize.rows === FIELD_SIZES.LARGE.rows ? "active" : ""
            }`}
            onClick={() => setFieldSize(FIELD_SIZES.LARGE)}
          >
            {t("options.large")} (8x8)
          </button>
        </div>
      </div>

      <div className="options-section">
        <h3>{t("options.playWithBot")}</h3>
        <div className="toggle-container">
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={playWithBot}
              onChange={(e) => setPlayWithBot(e.target.checked)}
            />
            <span className="toggle-slider"></span>
            {t("options.playWithBot")}
          </label>
        </div>
      </div>

      {playWithBot && (
        <div className="options-section">
          <h3>{t("options.difficulty")}</h3>
          <div className="difficulty-slider">
            <input
              type="range"
              min="1"
              max="5"
              value={difficulty}
              onChange={(e) => setDifficulty(parseInt(e.target.value))}
            />
            <div className="difficulty-labels">
              <span>{t("options.easy")}</span>
              <span>{t("options.medium")}</span>
              <span>{t("options.hard")}</span>
            </div>
            <div className="difficulty-value">
              {t("options.difficulty")}: {difficulty}
            </div>
          </div>
        </div>
      )}
      <button className="start-game-button" onClick={onStartGame}>
        {t("options.startGame")}
      </button>
    </div>
  );
};

export default Options;
