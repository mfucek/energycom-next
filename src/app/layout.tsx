import { Viewport } from '@/components/Viewport';
import { ThemeProvider } from '@/modules/theme/theme-provider';
import '@/styles/colors.css';
import '@/styles/globals.css';
import '@/styles/typography.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Energycom - Ponude',
	description: 'Alat za izdavanje ponuda',
	creator: 'Matija Fućek, Energycom d.o.o.'
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<ThemeProvider>
				<body className={inter.className}>
					<Viewport>{children}</Viewport>
				</body>
			</ThemeProvider>
		</html>
	);
}
