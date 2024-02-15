import {
	GetTranslationType,
	Language,
	TranslatedList,
	Translation,
	TranslationList,
	languages
} from '../types';

const objectIsTranslationDict = (obj: any) => {
	if (languages.every((a) => typeof obj[a] === 'string')) {
		// obj is a translation
		return false;
	}

	// obj is a translation dict
	return true;
};

export const getTranslation = <
	T extends TranslationList | Translation,
	L extends Language
>(
	list: T,
	language: L
) => {
	const out = {} as TranslatedList;

	for (const key in list) {
		const val = list[key] as Translation | TranslationList;

		// if (val.en === undefined) {
		if (objectIsTranslationDict(val)) {
			// if val is translation list
			out[key] = getTranslation(val as TranslationList, language);
		} else {
			// if val is translation
			out[key] = (list[key] as Translation)[language];
		}
	}

	return out as GetTranslationType<typeof list, L>;
};
