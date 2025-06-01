export const getGameStateText = (gameState, withBot, t) => {
  switch (gameState) {
    case "NOT_STARTED":
      return t("gameState.waitingForGame");
    case "PLAYING":
      return t("gameState.playing");
    case "PLAYER_ONE_WON":
      return withBot ? t("gameState.youWon") : t("gameState.playerOneWon");
    case "PLAYER_TWO_WON":
      return withBot ? t("gameState.botWon") : t("gameState.playerTwoWon");
    case "DRAW":
      return t("gameState.draw");
    case "WAITING_FOR_PLAYER":
      return t("gameState.waitingForPlayers");
    default:
      return t("gameState.unknownGameState");
  }
};
