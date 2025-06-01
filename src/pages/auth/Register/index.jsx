import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "../../../components/ThemeToggle/index.jsx";
import authService from "../../../api/auth.js";
import "../styles.css";
import LanguageToggle from "../../../components/LanguageToggle/index.jsx";
import { useTranslation } from "react-i18next";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await authService.register(formData);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-toggle-container">
        <ThemeToggle />
        <LanguageToggle />
      </div>
      <h2>{t("auth.register")}</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">{t("auth.username")}</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">{t("auth.password")}</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? t("auth.registering") : t("auth.register")}
        </button>
      </form>
      <p>
        {t("auth.alreadyHaveAccount")}
        <Link to="/login">{t("auth.login")}</Link>
      </p>
    </div>
  );
};

export default Register;
