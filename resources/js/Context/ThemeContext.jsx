import React, { useState, useEffect, createContext, useContext } from 'react';


const ThemeContext = createContext();


const ThemeProvider = ({ children }) => {
  const storedTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(storedTheme || "light");

  const applyTheme = (selectedTheme) => {
    const htmlElement = document.querySelector("html");
    htmlElement.classList.remove("light", "dark");
    htmlElement.classList.add(selectedTheme);
  };

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
