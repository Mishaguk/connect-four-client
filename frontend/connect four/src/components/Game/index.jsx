import React, { useState, useCallback, useEffect } from "react";
import Board from "../Board/index.jsx";
import Options from "../Options/index.jsx";
import { FIELD_SIZES } from "../Options/constants.js";
import gameService from "../../api/game.js";
import "./styles.css";
import GameTabs from "../GameTabs/index.jsx";
import { calculateScore } from "../../utils/scoreCalculator.js";
import { getGameStateText } from "./helpers.js";
import { useTranslation } from "react-i18next";

const Game = () => {
  const { t } = useTranslation();
  const [fieldSize, setFieldSize] = useState(FIELD_SIZES.MEDIUM);
  const [playWithBot, setPlayWithBot] = useState(false);
  const [difficulty, setDifficulty] = useState(3);
  const [board, setBoard] = useState(null);
  const [isBotMoving, setIsBotMoving] = useState(false);
  const [gameState, setGameState] = useState("NOT_STARTED");
  const [moveCount, setMoveCount] = useState(0);
  const [currentGameOptions, setCurrentGameOptions] = useState({});

  const handleStartGame = async () => {
    const response = await gameService.createGame(
      fieldSize.rows,
      fieldSize.columns,
      playWithBot,
      difficulty
    );
    setCurrentGameOptions({
      fieldSize,
      playWithBot,
      difficulty,
    });
    setBoard(response.board);
    setGameState(response.gameState);
  };

  const handleCellClick = async (col) => {
    if (isBotMoving || gameState !== "PLAYING") return;

    try {
      const response = await gameService.makeMove(col);
      setBoard(response.board);
      setGameState(response.gameState);
      setMoveCount(moveCount + 1);
      if (currentGameOptions.playWithBot) {
        setIsBotMoving(true);
        setTimeout(handleBotMove, 600);
      }
    } catch (error) {
      console.error("Failed to make move:", error);
    }
  };

  const handleBotMove = async () => {
    const response = await gameService.makeBotMove();
    setBoard(response.board);
    setIsBotMoving(false);
    setGameState(response.gameState);
  };

  const handleGameEnd = useCallback(() => {
    if (currentGameOptions.playWithBot) {
      const score = calculateScore(gameState, moveCount);
      if (score > 0) {
        gameService.addGameScore({
          player: localStorage.getItem("username"),
          game: "connectFour",
          points: score,
          playedOn: new Date().toISOString(),
        });
      }
    }
  }, [currentGameOptions.playWithBot, gameState, moveCount]);

  useEffect(() => {
    if (gameState !== "PLAYING") {
      handleGameEnd();
    }
  }, [gameState, handleGameEnd]);

  return (
    <div className="game-container">
      <Options
        fieldSize={fieldSize}
        setFieldSize={setFieldSize}
        playWithBot={playWithBot}
        setPlayWithBot={setPlayWithBot}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        onStartGame={handleStartGame}
      />
      <div className="game-info-container">
        <div className="game-content">
          <div className="game-state">
            <h1>
              {getGameStateText(gameState, currentGameOptions.playWithBot, t)}
            </h1>
          </div>
          <Board
            board={board}
            onCellClick={handleCellClick}
            rows={fieldSize.rows}
            cols={fieldSize.columns}
            disabled={isBotMoving}
          />
        </div>
        <GameTabs />
      </div>
    </div>
  );
};

export default Game;
