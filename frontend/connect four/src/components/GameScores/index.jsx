import PropTypes from "prop-types";
import "./styles.css";
import gameService from "../../api/game.js";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/formatDate.js";
import { FaSync } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { IoSearchOutline } from "react-icons/io5";
const GameScores = () => {
  const [scores, setScores] = useState([]);
  const [search, setSearch] = useState("");
  const { t } = useTranslation();

  const fetchScores = async () => {
    const scores = await gameService.getGameScores();
    setScores(scores);
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search) {
        searchScores(search);
      } else {
        fetchScores();
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const searchScores = async (query) => {
    const filteredScores = await gameService.searchGameScores(query);
    setScores(filteredScores);
  };

  useEffect(() => {
    fetchScores();
  }, []);

  return (
    <div className="game-scores">
      <h2>{t("scores.header")}</h2>
      <div className="scores-header">
        <div className="scores-search">
          <IoSearchOutline className="search-icon" />
          <input
            type="text"
            placeholder={t("scores.search")}
            value={search}
            onChange={handleSearch}
          />
        </div>
        <button className="refresh-button" onClick={fetchScores}>
          <FaSync />
        </button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>{t("scores.game")}</th>
              <th>{t("scores.player")}</th>
              <th>{t("scores.points")}</th>
              <th>{t("scores.date")}</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, index) => (
              <tr key={index}>
                <td>{score.game}</td>
                <td>{score.player}</td>
                <td>{score.points}</td>
                <td>{formatDate(score.playedOn)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GameScores;
