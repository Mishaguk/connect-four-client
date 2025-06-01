import AppRouter from "./routes/Router.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import "./styles/theme.css";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <AppRouter />
      </div>
    </ThemeProvider>
  );
}

export default App;
