import { ThemeProvider } from "../src/components/context/ThemeContext";
import { AuthProvider } from "../src/components/context/AuthContext";
import AppContent from "./components/AppContent";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
