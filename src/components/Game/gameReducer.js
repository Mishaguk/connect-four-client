import { FIELD_SIZES } from "../Options/constants";

export const initialState = {
  fieldSize: FIELD_SIZES.MEDIUM,
  playWithBot: false,
  playMultiplayer: false,
  difficulty: 3,
  board: null,
  isBotMoving: false,
  gameState: "NOT_STARTED",
  moveCount: 0,
  currentGameOptions: {},
  roomCode: "",
  showErrorJoinRoom: false,
  multiplayerGameInfo: {},
  activeGameId: "",
};

export function gameReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD_SIZE":
      return { ...state, fieldSize: action.payload };
    case "SET_PLAY_WITH_BOT":
      return { ...state, playWithBot: action.payload };
    case "SET_PLAY_MULTIPLAYER":
      return { ...state, playMultiplayer: action.payload };
    case "SET_DIFFICULTY":
      return { ...state, difficulty: action.payload };
    case "SET_BOARD":
      return { ...state, board: action.payload };
    case "SET_GAME_STATE":
      return { ...state, gameState: action.payload };
    case "SET_BOT_MOVING":
      return { ...state, isBotMoving: action.payload };
    case "SET_ROOM_CODE":
      return { ...state, roomCode: action.payload };
    case "SET_SHOW_ERROR":
      return { ...state, showErrorJoinRoom: action.payload };
    case "INCREMENT_MOVE_COUNT":
      return { ...state, moveCount: state.moveCount + 1 };
    case "SET_CURRENT_OPTIONS":
      return { ...state, currentGameOptions: action.payload };
    case "MULTIPLAYER_GAME_INFO":
      return { ...state, multiplayerGameInfo: action.payload };
    case "SET_ACTIVE_GAME_ID":
      return { ...state, activeGameId: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}
