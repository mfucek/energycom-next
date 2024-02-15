'use client';

import { TranslationList } from './types';
import { useLocalization } from './use-localization';
import { getTranslation } from './utils/get-translation';

export const useTranslation = <T extends TranslationList>(strings: T) => {
	const language = useLocalization().language;
	const t = getTranslation(strings, language);
	return { t };
};
