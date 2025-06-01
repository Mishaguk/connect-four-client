import api from "./axios.js";

const gameService = {
  createGame: async (rows, columns, withBot, difficulty) => {
    try {
      const response = await api.post(
        `/connectFour/new?rows=${rows}&columns=${columns}&withBot=${withBot}&difficulty=${difficulty}`
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching board:", error);
      throw error;
    }
  },

  makeMove: async (col) => {
    try {
      const response = await api.post(
        `/connectFour/move?gameId=${localStorage.getItem(
          "gameId"
        )}&column=${col}`
      );
      return response.data;
    } catch (error) {
      console.error("Error making move:", error);
      throw error;
    }
  },
  makeBotMove: async () => {
    try {
      const response = await api.get(
        `/connectFour/bot/move?gameId=${localStorage.getItem("gameId")}`
      );
      return response.data;
    } catch (error) {
      console.error("Error getting bot move:", error);
      throw error;
    }
  },
  getGameScores: async () => {
    try {
      const response = await api.get(`/score/connectFour`);
      return response.data;
    } catch (error) {
      console.error("Error getting game score:", error);
      throw error;
    }
  },
  getGameComments: async () => {
    try {
      const response = await api.get(`/comment/connectFour`);
      return response.data;
    } catch (error) {
      console.error("Error getting game comments:", error);
      throw error;
    }
  },
  addGameComment: async (comment) => {
    try {
      const response = await api.post(`/comment`, comment);
      return response.data;
    } catch (error) {
      console.error("Error adding game comment:", error);
    }
  },
  getGameRating: async () => {
    try {
      const response = await api.get(`/rating/average/connectFour`);
      return response.data;
    } catch (error) {
      console.error("Error getting game rating:", error);
      throw error;
    }
  },
  addGameRating: async (rating) => {
    try {
      const response = await api.post(`/rating`, rating);
      return response.data;
    } catch (error) {
      console.error("Error adding game rating:", error);
      throw error;
    }
  },
  addGameScore: async (score) => {
    try {
      const response = await api.post(`/score`, score);
      return response.data;
    } catch (error) {
      console.error("Error adding game score:", error);
      throw error;
    }
  },
  searchGameScores: async (search) => {
    try {
      const response = await api.get(
        `/score/connectFour/search?nickname=${search}`
      );
      return response.data;
    } catch (error) {
      console.error("Error searching game scores:", error);
      throw error;
    }
  },
  getCurrentPlayerRating: async (username) => {
    try {
      const response = await api.get(`/rating/connectFour/${username}`);
      return response.data;
    } catch (error) {
      console.error("Error getting current player rating:", error);
      throw error;
    }
  },
  createRoom: async (owner, rows, columns) => {
    try {
      const response = await api.post(
        `/connectFour/multiplayer/createRoom?owner=${owner}&rows=${rows}&columns=${columns}`
      );
      return response.data;
    } catch (error) {
      console.error("Error creating room");
      throw error;
    }
  },
  joinRoom: async (roomId, username) => {
    try {
      const response = await api.post(
        `/connectFour/multiplayer/join?roomId=${roomId}&username=${username}`
      );
      return response.data;
    } catch (error) {
      console.error("Error join room");
      throw error;
    }
  },
  getMultiplayerGame: async (roomId) => {
    try {
      const response = await api.get(
        `/connectFour/multiplayer/game?roomId=${roomId}`
      );

      return response.data;
    } catch (error) {
      console.error("Error getting game");
      throw error;
    }
  },
  makeMultiplayerMove: async (roomId, username, column) => {
    try {
      const response = await api.post(
        `/connectFour/multiplayer/move?roomId=${roomId}&username=${username}&column=${column}`
      );
      return response.data;
    } catch (error) {
      console.error("Error making move");
      throw error;
    }
  },
  leaveRoom: async (roomId, username) => {
    try {
      const response = await api.post(
        `/connectFour/multiplayer/leave?roomId=${roomId}&username=${username}`
      );
      return response.data;
    } catch (error) {
      console.error("Error leaving room");
      throw error;
    }
  },
  keepAlive: async (gameId) => {
    try {
      const response = await api.post(
        `/connectFour/keepalive?gameId=${gameId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error posting keep alive");
      throw error;
    }
  },
};

export default gameService;
