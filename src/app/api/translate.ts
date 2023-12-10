import { Language } from '@/modules/bill/constants/translations';

const url = 'https://api.openai.com/v1/chat/completions';

const unAbbreviate = (language: Language) => {
	switch (language) {
		case 'hr':
			return 'Croatian';
		case 'en':
			return 'English';
		case 'fr':
			return 'French';
		case 'de':
			return 'German';
		case 'it':
			return 'Italian';
		default:
			return language;
	}
};

export const translate = async (message: string, language: Language) => {
	console.log('translate');
	console.log(message, language);

	const body = JSON.stringify({
		messages: [
			{
				role: 'system',
				content: `You are a translator that translates user's product & payment descriptions from the Croation language to the ${unAbbreviate(
					language
				)} language.
	
					Make sure to:
					- Fix spelling and grammar
					- If the text contains quotes, repeat the text inside the quotes verbatim
					- Do not change the meaning of the text`
			},
			{ role: 'user', content: message }
		],
		model: 'gpt-3.5',
		stream: false
	});
	console.log('body');
	console.log(body);

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
		},
		body: body
	});
	const data = await response.json();
	console.log('data');
	console.log(data);

	const out = data.choices[0].message.content as string;

	return out;
};
