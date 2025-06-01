import api from "./axios.js";

const authService = {
  register: async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },

  login: async (userData) => {
    const response = await api.post("/auth/login", userData);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("username", response.data.username);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
  },
};

export default authService;
