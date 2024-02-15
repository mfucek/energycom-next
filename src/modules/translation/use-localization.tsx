'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Language, languages } from './types';

interface ILocalizationContext {
	language: Language;
	setLanguage: (lang: Language) => void;
	nextLanguage: () => void;
}

const LocalizationContext = createContext<ILocalizationContext | null>(null);

export const LocalizationProvider = ({
	children
}: {
	children: React.ReactNode;
}) => {
	const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

	useEffect(() => {
		// const language = localStorage.getItem('language') as Language;
		// setCurrentLanguage(language ?? 'en');
	}, []);

	return (
		<LocalizationContext.Provider
			value={{
				language: currentLanguage,
				setLanguage: (lang) => {
					localStorage.setItem('language', lang);
					setCurrentLanguage(lang);
				},
				nextLanguage: () => {
					console.log('nextLanguage');

					const currIndex = languages.indexOf(currentLanguage);
					const nextIndex = (currIndex + 1) % languages.length;
					const nextLang = languages[nextIndex];
					setCurrentLanguage(nextLang);
				}
			}}>
			{children}
		</LocalizationContext.Provider>
	);
};

export const useLocalization = () => {
	const ctx = useContext(LocalizationContext);
	if (!ctx)
		throw new Error(
			'useLocalization must be used within a LocalizationProvider'
		);

	return ctx;
};
