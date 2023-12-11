import { TrpcProvider } from '@/lib/trpc/client/provider';
import { ThemeProvider } from '@/modules/theme/theme-provider';
import { FC, PropsWithChildren } from 'react';

export const Providers: FC<PropsWithChildren<{}>> = ({ children }) => {
	return (
		<>
			<TrpcProvider>
				<ThemeProvider>{children}</ThemeProvider>
			</TrpcProvider>
		</>
	);
};
