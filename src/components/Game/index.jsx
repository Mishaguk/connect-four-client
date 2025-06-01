import React, { useEffect, useReducer } from "react";
import Board from "../Board/index.jsx";
import Options from "../Options/index.jsx";

import gameService from "../../api/game.js";
import "./styles.css";
import GameTabs from "../GameTabs/index.jsx";

import { getGameStateText } from "./helpers.js";
import { useTranslation } from "react-i18next";
import Error from "../Error/index.jsx";
import MultiplayerGameHeader from "../MultiplayerGameHeader/index.jsx";

import { useBot } from "./hooks/useBot/index.js";
import { useGame } from "./hooks/useGame/index.js";
import { useMultiplayer } from "./hooks/useMultiplayer/index.js";

import { gameReducer, initialState } from "./gameReducer.js";

const Game = () => {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const username = localStorage.getItem("username");

  const { handleStartGame, handleGameEnd } = useGame(state, dispatch, username);
  const { handleCreateRoom, handleJoin, handleLeaveRoom } = useMultiplayer(
    state,
    dispatch,
    username
  );
  const { handleBotMove } = useBot(dispatch);

  useEffect(() => {
    if (state.gameState !== "PLAYING") {
      handleGameEnd();
    }
  }, [state.gameState, handleGameEnd]);

  const handleCellClick = async (col) => {
    if (state.isBotMoving || state.gameState !== "PLAYING") return;

    try {
      const response = state.activeGameId
        ? await gameService.makeMultiplayerMove(
            state.activeGameId,
            username,
            col
          )
        : await gameService.makeMove(col);

      dispatch({ type: "SET_BOARD", payload: response.board });
      dispatch({ type: "SET_GAME_STATE", payload: response.gameState });
      dispatch({ type: "INCREMENT_MOVE_COUNT" });

      if (state.currentGameOptions.playWithBot) {
        dispatch({ type: "SET_BOT_MOVING", payload: true });
        setTimeout(handleBotMove, 600);
      }
    } catch (err) {
      console.error("Failed to make move:", err);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("gameId")) return;

    const intervalId = setInterval(() => {
      gameService.keepAlive(localStorage.getItem("gameId"));
    }, 2 * 1000 * 60); // 2 minutes

    return () => clearInterval(intervalId);
  });

  return (
    <div className="game-container">
      <Options
        options={{
          fieldSize: state.fieldSize,
          playWithBot: state.playWithBot,
          playMultiplayer: state.playMultiplayer,
          roomCode: state.roomCode,
          difficulty: state.difficulty,
        }}
        setFieldSize={(v) => dispatch({ type: "SET_FIELD_SIZE", payload: v })}
        setPlayWithBot={(v) =>
          dispatch({ type: "SET_PLAY_WITH_BOT", payload: v })
        }
        setPlayMultiplayer={(v) =>
          dispatch({ type: "SET_PLAY_MULTIPLAYER", payload: v })
        }
        setRoomCode={(v) => dispatch({ type: "SET_ROOM_CODE", payload: v })}
        onCreateRoom={handleCreateRoom}
        onJoin={handleJoin}
        setDifficulty={(v) => dispatch({ type: "SET_DIFFICULTY", payload: v })}
        onStartGame={handleStartGame}
      />

      <div className="game-info-container">
        <div className="game-content">
          {localStorage.getItem("roomId") && (
            <MultiplayerGameHeader
              onLeave={() => handleLeaveRoom(username)}
              player1_name={state.multiplayerGameInfo.player1_name}
              player2_name={state.multiplayerGameInfo.player2_name}
              currentPLayer={state.multiplayerGameInfo.current_player_turn}
            />
          )}
          <Error
            showError={state.showErrorJoinRoom}
            text={"Room with such code doesn't exists"}
          />
          <div className="game-state">
            <h1>
              {getGameStateText(
                state.gameState,
                state.currentGameOptions.playWithBot,
                t
              )}
            </h1>
          </div>
          <Board
            board={state.board}
            onCellClick={handleCellClick}
            rows={state.fieldSize.rows}
            cols={state.fieldSize.columns}
            disabled={state.isBotMoving}
          />
        </div>
        <GameTabs />
      </div>
    </div>
  );
};

export default Game;
