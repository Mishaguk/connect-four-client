import { useEffect } from "react";
import gameService from "../../../../api/game";

export function useMultiplayer(state, dispatch, username) {
  useEffect(() => {
    const gameId = localStorage.getItem("roomId");
    if (gameId) dispatch({ type: "SET_ACTIVE_GAME_ID", payload: gameId });
  }, [dispatch]);

  const dispatchMultiplayerGameInfo = (game, dispatch) => {
    dispatch({
      type: "MULTIPLAYER_GAME_INFO",
      payload: {
        player1_name: game.player_1,
        player2_name: game.player_2,
        current_player_turn: game.currentPlayer,
      },
    });
  };

  const handleCreateRoom = async () => {
    if (state.activeGameId) return;

    dispatch({
      type: "SET_CURRENT_OPTIONS",
      payload: {
        fieldSize: state.fieldSize,
        playWithBot: false,
        difficulty: -1,
      },
    });

    const roomId = await gameService.createRoom(
      username,
      state.fieldSize.rows,
      state.fieldSize.columns
    );
    dispatch({ type: "SET_ACTIVE_GAME_ID", payload: roomId });
    localStorage.setItem("roomId", roomId);

    const game = await gameService.getMultiplayerGame(roomId);
    dispatch({ type: "SET_BOARD", payload: game.board });
    dispatch({ type: "SET_GAME_STATE", payload: game.gameState });

    dispatchMultiplayerGameInfo(game, dispatch);
  };

  const handleJoin = async () => {
    if (state.activeGameId) return;
    const game = await gameService.joinRoom(state.roomCode, username);
    if (!game) {
      dispatch({ type: "SET_SHOW_ERROR", payload: true });
      setTimeout(() => {
        dispatch({ type: "SET_SHOW_ERROR", payload: false });
      }, 3000);
    } else {
      dispatch({ type: "SET_ACTIVE_GAME_ID", payload: state.roomCode });
      localStorage.setItem("roomId", state.roomCode);
      dispatch({ type: "SET_BOARD", payload: game.board });
      dispatch({ type: "SET_GAME_STATE", payload: game.gameState });

      dispatchMultiplayerGameInfo(game, dispatch);
    }
    dispatch({ type: "SET_ROOM_CODE", payload: "" });
  };

  const handleLeaveRoom = async (username) => {
    await gameService.leaveRoom(localStorage.getItem("roomId"), username);
    localStorage.removeItem("roomId");
    dispatch({ type: "SET_ACTIVE_GAME_ID", payload: "" });
    dispatch({ type: "SET_BOARD", payload: null });
    dispatch({ type: "SET_GAME_STATE", payload: "NOT_STARTED" });
  };

  useEffect(() => {
    if (state.activeGameId) {
      const intervalId = setInterval(async () => {
        const game = await gameService.getMultiplayerGame(
          localStorage.getItem("roomId")
        );
        dispatch({ type: "SET_BOARD", payload: game.board });
        dispatch({ type: "SET_GAME_STATE", payload: game.gameState });
        dispatchMultiplayerGameInfo(game, dispatch);
      }, 2000);

      return () => clearInterval(intervalId);
    }
  }, [state.playMultiplayer, dispatch, state.activeGameId]);

  return { handleCreateRoom, handleJoin, handleLeaveRoom };
}
