import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
	const [darkMode, setDarkMode] = useState(() => {
		return localStorage.getItem('theme') === 'dark';
	});

	useEffect(() => {
		localStorage.setItem('theme', darkMode ? 'dark' : 'light');
		document.documentElement.setAttribute(
			'data-theme',
			darkMode ? 'dark' : 'light'
		);
	}, [darkMode]);

	return (
		<ThemeContext.Provider value={{ darkMode, setDarkMode }}>
			{children}
		</ThemeContext.Provider>
	);
}
