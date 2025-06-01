import PropTypes from "prop-types";
import "./styles.css";
import { useTranslation } from "react-i18next";
const Board = ({ board, onCellClick, disabled }) => {
  const { t } = useTranslation();

  const getCellClass = (cell) => {
    switch (cell) {
      case "PLAYER_ONE":
        return "player-one";
      case "PLAYER_TWO":
        return "player-two";
      default:
        return "empty";
    }
  };

  return (
    <div className="board-wrapper">
      {board ? (
        <div className="board-container">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="board-row">
              {row.map((cell, colIndex) => (
                <div
                  key={colIndex}
                  className={`board-cell ${getCellClass(cell)} ${
                    disabled ? "disabled" : ""
                  }`}
                  onClick={() => !disabled && onCellClick(colIndex)}
                />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="board-placeholder">
          <div className="placeholder-content">
            <h2>{t("board.title")}</h2>
            <p>{t("board.description")}</p>
          </div>
        </div>
      )}
    </div>
  );
};

Board.propTypes = {
  board: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.oneOf(["PLAYER_ONE", "PLAYER_TWO", "EMPTY"]))
  ),
  onCellClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

Board.defaultProps = {
  disabled: false,
};

export default Board;
