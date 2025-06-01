import { useCallback, useEffect } from "react";
import gameService from "../../../../api/game";
import { calculateScore } from "../../../../utils/scoreCalculator";

export function useGame(state, dispatch, username) {
  useEffect(() => {}, []);

  const handleStartGame = async () => {
    if (state.activeGameId) return;
    const response = await gameService.createGame(
      state.fieldSize.rows,
      state.fieldSize.columns,
      state.playWithBot,
      state.difficulty
    );

    dispatch({ type: "SET_BOARD", payload: response.board });
    dispatch({ type: "SET_GAME_STATE", payload: response.gameState });
    dispatch({
      type: "SET_CURRENT_OPTIONS",
      payload: {
        fieldSize: state.fieldSize,
        playWithBot: state.playWithBot,
        difficulty: state.difficulty,
      },
    });

    localStorage.setItem("gameId", response.gameId);
  };

  const handleGameEnd = useCallback(() => {
    if (state.playWithBot) {
      const score = calculateScore(state.gameState, state.moveCount);
      if (score > 0) {
        gameService.addGameScore({
          player: username,
          game: "connectFour",
          points: score,
          playedOn: new Date().toISOString(),
        });
      }
    }
    localStorage.removeItem("gameId");
  }, [state, username]);

  return { handleStartGame, handleGameEnd };
}
