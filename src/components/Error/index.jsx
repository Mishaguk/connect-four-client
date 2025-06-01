import { FiAlertCircle } from "react-icons/fi";
import "./styles.css";

const Error = ({ text, showError }) => {
  if (showError)
    return (
      <div className="error-card">
        <div className="error-icon">
          <FiAlertCircle />
        </div>
        <div className="error-text">{text}</div>
      </div>
    );
};

export default Error;
