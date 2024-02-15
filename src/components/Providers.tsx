import { TrpcProvider } from '@/lib/trpc/client/provider';
import { ThemeProvider } from '@/modules/theme/theme-provider';
import { LocalizationProvider } from '@/modules/translation/use-localization';
import { FC, PropsWithChildren } from 'react';

export const Providers: FC<PropsWithChildren<{}>> = ({ children }) => {
	return (
		<>
			<TrpcProvider>
				<ThemeProvider>
					<LocalizationProvider>{children}</LocalizationProvider>
				</ThemeProvider>
			</TrpcProvider>
		</>
	);
};
