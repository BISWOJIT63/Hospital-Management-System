import * as React from "react";
import { ThemeContext } from "../../components/context/ThemeContext";

export function ThemeProvider({ children }) {
  const { theme } = React.useContext(ThemeContext) || { theme: "light" };

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      {children}
    </div>
  );
}
