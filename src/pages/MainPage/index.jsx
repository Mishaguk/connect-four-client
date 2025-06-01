import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../../components/ThemeToggle/index.jsx";
import "./styles.css";
import Game from "../../components/Game/index.jsx";
import { setUnauthorizedHandler } from "../../api/axios.js";
import LanguageToggle from "../../components/LanguageToggle/index.jsx";
import { useTranslation } from "react-i18next";
const MainPage = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  useEffect(() => {
    setUnauthorizedHandler(() => {
      navigate("/login");
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="main-container">
      <header className="main-header">
        <h1>Connect Four</h1>
        <div className="header-buttons">
          <LanguageToggle />
          <ThemeToggle />
          <button onClick={handleLogout} className="logout-button">
            {t("logout")}
          </button>
        </div>
      </header>

      <Game />
    </div>
  );
};

export default MainPage;
