import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext.tsx"; // Import ThemeProvider

createRoot(document.getElementById("root")!).render(
  <ThemeProvider> {/* Wrap App with ThemeProvider */}
    <App />
  </ThemeProvider>
);