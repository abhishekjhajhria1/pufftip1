import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeType = "notebook" | "studio";

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>("studio");

  // Load from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("pufftip_theme") as ThemeType | null;
    if (savedTheme === "studio" || savedTheme === "notebook") {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      setTheme("studio");
      document.documentElement.setAttribute("data-theme", "studio");
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "notebook" ? "studio" : "notebook";
      localStorage.setItem("pufftip_theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
