import { t } from '@/lib/trpc/server';
import { invoiceRouter } from '@/modules/bill/api';
import { Language, languages } from '@/modules/bill/constants/translations';
import { z } from 'zod';

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

export const appRouter = t.router({
	gpt: t.router({
		translate: t.procedure
			.input(z.object({ message: z.string(), language: z.enum(languages) }))
			.mutation(async ({ input }) => {
				const { message, language } = input;

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
							- Do not change the meaning of the text
							- Do not change the text if it is already in the ${unAbbreviate(
								language
							)} language!`
						},
						{ role: 'user', content: message }
					],
					model: 'gpt-3.5-turbo',
					stream: false
				});

				const response = await fetch(url, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
					},
					body: body
				});
				const data = await response.json();

				return data.choices[0].message.content as string;
			})
	}),
	pdf: invoiceRouter
});

export type AppRouter = typeof appRouter;
