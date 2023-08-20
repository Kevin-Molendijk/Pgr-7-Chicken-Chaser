//imports voor dependencies
import React, { createContext, useState, useContext } from 'react';

export const ThemeContext = createContext();

//maakt het component aan om de mode te wisselen
export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    //functie om dark mode aan en uit te zetten
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    //defineert het huidige thema
    const theme = {
        isDarkMode,
        toggleDarkMode,
    };

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};