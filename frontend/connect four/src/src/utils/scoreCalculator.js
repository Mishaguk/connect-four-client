export const calculateScore = (gameState, moveCount) => {
  const BASE_WIN_SCORE = 5000;
  const BASE_DRAW_SCORE = 600;
  const MOVE_PENALTY = 10;

  const movePenalty = Math.max(0, moveCount - 4) * MOVE_PENALTY;

  switch (gameState) {
    case "PLAYER_ONE_WON":
      return BASE_WIN_SCORE - movePenalty;

    case "PLAYER_TWO_WON":
      return 0;

    case "DRAW":
      return BASE_DRAW_SCORE - movePenalty;

    default:
      return 0;
  }
};
