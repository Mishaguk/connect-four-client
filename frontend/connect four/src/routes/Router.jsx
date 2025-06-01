import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../pages/auth/Login/index.jsx";
import Register from "../pages/auth/Register/index.jsx";
import MainPage from "../pages/MainPage/index.jsx";
import { isTokenExpired } from "../api/axios.js";
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AuthorizedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (token && !isTokenExpired(token)) {
    return <Navigate to="/main" replace />;
  }
  return children;
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <AuthorizedRoute>
              <Login />
            </AuthorizedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <AuthorizedRoute>
              <Register />
            </AuthorizedRoute>
          }
        />
        <Route
          path="/main"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
