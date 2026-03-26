import { ThemeProvider } from "./components/context/ThemeContext";
import { AuthProvider } from "./components/context/AuthContext";
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
