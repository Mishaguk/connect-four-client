import { useState } from "react";
import { FaGlobe } from "react-icons/fa";
import "./styles.css";
import { useTranslation } from "react-i18next";
const LanguageToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n, t } = useTranslation();

  const languages = [
    { code: "en", name: t("language.en"), flag: "🇬🇧" },
    { code: "sk", name: t("language.sk"), flag: "🇸🇰" },
    { code: "uk", name: t("language.uk"), flag: "🇺🇦" },
  ];

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
    localStorage.setItem("language", langCode);
  };

  const currentLanguage = languages.find((lang) => lang.code === i18n.language);

  return (
    <div className="language-selector">
      <button
        className="language-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
      >
        <FaGlobe className="globe-icon" />
        <span className="current-language">
          {currentLanguage?.flag} {currentLanguage?.name}
        </span>
      </button>

      {isOpen && (
        <div className="language-dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-option ${
                i18n.language === lang.code ? "active" : ""
              }`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <span className="flag">{lang.flag}</span>
              <span className="name">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageToggle;
