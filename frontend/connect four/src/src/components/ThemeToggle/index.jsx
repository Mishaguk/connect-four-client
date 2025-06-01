import { useTheme } from "../../context/ThemeContext.jsx";
import "./styles.css";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      className={`theme-toggle ${isDarkMode ? "dark" : "light"}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
    >
      <div className="theme-toggle__icon">
        <FaSun className="theme-toggle__sun" />
        <FaMoon className="theme-toggle__moon" />
      </div>
    </button>
  );
};

export default ThemeToggle;
