import { Providers } from '@/components/Providers';
import { Viewport } from '@/components/Viewport';
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
			<body className={inter.className}>
				<Providers>
					<Viewport>{children}</Viewport>
				</Providers>
			</body>
		</html>
	);
}
