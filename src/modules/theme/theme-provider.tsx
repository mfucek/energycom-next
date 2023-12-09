'use client';
import { createContext, useContext, useEffect, useState } from 'react';

type theme = 'light' | 'dark';

interface IThemeContext {
	theme: 'dark' | 'light' | null;
	setLight: () => void;
	setDark: () => void;
	toggle: () => void;
}

const ThemeContext = createContext<IThemeContext>({
	theme: 'light',
	setLight: () => {},
	setDark: () => {},
	toggle: () => {}
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [currentTheme, setCurrentTheme] = useState<theme>(
		// (localStorage.getItem("theme") as theme) ||
		'light'
	);

	const changeTheme = (theme: theme) => {
		setCurrentTheme(theme);
		localStorage.setItem('theme', theme);
		theme === 'dark'
			? document.body.classList.remove('dark')
			: document.body.classList.add('dark');
	};

	useEffect(() => {
		const preferredTheme: theme = window.matchMedia(
			'(prefers-color-scheme: dark)'
		).matches
			? 'dark'
			: 'light';

		const storedTheme = localStorage.getItem('theme');

		if (storedTheme) {
			changeTheme(storedTheme as theme);
		} else if (preferredTheme) {
			changeTheme(preferredTheme);
		}
	}, []);

	const setLight = () => {
		changeTheme('light');
	};

	const setDark = () => {
		changeTheme('dark');
	};

	const toggle = () => {
		changeTheme(currentTheme === 'light' ? 'dark' : 'light');
	};

	return (
		<ThemeContext.Provider
			value={{
				theme: currentTheme,
				setLight,
				setDark,
				toggle
			}}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = (): IThemeContext => useContext(ThemeContext);

export default useTheme;
