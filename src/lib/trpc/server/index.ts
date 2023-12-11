import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import SuperJSON from 'superjson';
import { ZodError } from 'zod';

export const createContext = async ({
	req,
	resHeaders
}: FetchCreateContextFnOptions) => {
	// const session = getSession();

	// if (!session) {
	// 	return { session: null, company: null };
	// }

	// if (!session.user.companyId) {
	// 	return { session, company: null };
	// }

	// const company = await prisma.company.findUnique({
	// 	where: { companyId: session.user.companyId }
	// });

	// return { session, company: company };
	return {};
};
type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create({
	transformer: SuperJSON,
	errorFormatter(opts) {
		const { shape, error } = opts;
		return {
			...shape,
			data: {
				...shape.data,
				customErrorMessage:
					error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
						? JSON.parse(error.message || '')[0].message
						: 'An unexpected error occured, please try again later.'
			}
		};
	}
});
