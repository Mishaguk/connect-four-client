import { useTranslation } from "react-i18next";
import "./styles.css";

const MultiplayerGameHeader = ({
  onLeave,
  player1_name,
  player2_name,
  currentPLayer,
}) => {
  const roomId = localStorage.getItem("roomId");
  const { t } = useTranslation();
  return (
    <div className="multiplayer-header-container">
      <div className="roomInfo">
        <div className="roomId">
          <h2>{t("MultiplayerRoomId")}:</h2>
          <h3>{roomId}</h3>
        </div>
        <button className="leave-button" onClick={onLeave}>
          Leave
        </button>
      </div>

      <div className="player-info-container">
        <div className="player-info">
          <span className="player-color-circle red"></span>
          <div className="player-ident">
            <span>{player1_name}</span>
            <span className="ident-text">
              {localStorage.getItem("username") === player1_name ? "You" : ""}
            </span>
          </div>
        </div>
        <div className="currentTurn-info">
          <h3>Current turn: </h3>
          <div className="currentTurn-info-player">
            {currentPLayer === player1_name ? (
              <span className="player-color-circle red"></span>
            ) : (
              <span className="player-color-circle yellow"></span>
            )}
            <span>{currentPLayer}</span>
          </div>
        </div>
        <div className="player-info">
          <span className="player-color-circle yellow"></span>
          <div className="player-ident">
            <span>{player2_name}</span>
            <span className="ident-text">
              {localStorage.getItem("username") === player2_name ? "You" : ""}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiplayerGameHeader;
