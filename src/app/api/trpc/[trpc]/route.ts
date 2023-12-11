import { createContext } from '@/lib/trpc/server';
import { appRouter } from '@/server';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

const handler = async (request: Request) => {
	const request_route = request.url.split('/trpc/')[1].split('?')[0];
	let request_step = decodeURIComponent(request.url);

	// if has params, spit to console
	if (request_step.includes('?')) {
		request_step = request_step
			.split('/trpc/')[1]
			.split('?')[1]
			.split('&')
			.join('\n\t');
	} else {
		request_step = '';
	}
	const request_value = request_step;

	console.log(`\n\x1b[33m ${request_route} \x1b[0m`);
	console.log(`\t${request_value}\n`);

	return fetchRequestHandler({
		endpoint: '/api/trpc',
		req: request,
		router: appRouter,
		createContext: createContext,
		onError(opts) {
			const { error, type, path, input, ctx, req } = opts;
			console.log(error);
			if (error.code === 'INTERNAL_SERVER_ERROR') {
				// // error logging via Sentry
				// Sentry.withScope((scope) => {
				// 	// scope.setLevel('error');	// default
				// 	scope.setTag('route', path);
				// 	// scope.setTransactionName(path);
				// 	// logging the user
				// 	if (ctx?.session?.user) {
				// 		const user = ctx.session.user;
				// 		scope.setUser({ email: user.email, id: user.userId });
				// 	} else {
				// 		scope.setUser({ email: 'PUBLIC USER' });
				// 	}
				// 	scope.setTransactionName(path);
				// 	Sentry.captureException(error);
				// });
			}
		}
	});
};

export { handler as GET, handler as POST };
