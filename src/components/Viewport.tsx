'use client';

import useTheme from '@/modules/theme/theme-provider';
import Link from 'next/link';
import { FC, HTMLAttributes } from 'react';
import { Container } from './Container';

export const Viewport: FC<HTMLAttributes<HTMLDivElement>> = ({
	children,
	...rest
}) => {
	const { toggle } = useTheme();
	return (
		<div className="min-h-screen flex flex-col justify-between" {...rest}>
			<div>{children}</div>

			<Container>
				<div className="text-center text-neutral-medium caption py-10 flex justify-center gap-2">
					<button onClick={toggle} className="underline">
						Change theme{' '}
					</button>
					<p>Made with love by</p>
					<p>
						<Link
							href="https://mfucek.com"
							className="underline text-neutral-strong">
							Matija Fućek
						</Link>
						.
					</p>
				</div>
			</Container>
		</div>
	);
};
