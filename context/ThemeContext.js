import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import COLORS from "../themes/theme"; // Import your color definitions

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState("system");
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem("theme");
      if (storedTheme) setThemeState(storedTheme);
    };

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme);
    });

    loadTheme();

    return () => subscription.remove();
  }, []);

  const setTheme = async (newTheme) => {
    await AsyncStorage.setItem("theme", newTheme);
    setThemeState(newTheme);
  };

  const isDark = theme === "dark" || (theme === "system" && colorScheme === "dark");
  const themeColors = isDark ? COLORS.dark : COLORS.light;

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark, themeColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
