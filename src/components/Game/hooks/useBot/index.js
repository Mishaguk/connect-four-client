import gameService from "../../../../api/game";

export const useBot = (dispatch) => {
  const handleBotMove = async () => {
    const response = await gameService.makeBotMove();
    dispatch({ type: "SET_BOARD", payload: response.board });
    dispatch({ type: "SET_GAME_STATE", payload: response.gameState });
    dispatch({ type: "SET_BOT_MOVING", payload: false });
  };

  return { handleBotMove };
};
