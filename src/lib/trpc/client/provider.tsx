'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getFetch, httpBatchLink, loggerLink } from '@trpc/client';
import { useState } from 'react';
import superjson from 'superjson';
import { trpc } from '.';

const endpoint = process.env.NEXT_PUBLIC_API_URL;

export const TrpcProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnReconnect: true,
						refetchOnWindowFocus: true,
						staleTime: Infinity
					}
				}
			})
	);

	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				loggerLink({
					enabled: () => true
				}),
				httpBatchLink({
					url: endpoint + '/api/trpc',
					fetch: async (input, init?) => {
						const fetch = getFetch();
						return fetch(input, {
							...init,
							credentials: 'include'
						});
					}
				})
			],
			transformer: superjson
		})
	);
	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				{children}
				<ReactQueryDevtools />
			</QueryClientProvider>
		</trpc.Provider>
	);
};
