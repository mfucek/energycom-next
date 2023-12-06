import Link from 'next/link';
import { FC, HTMLAttributes } from 'react';
import { Container } from './Container';

export const Viewport: FC<HTMLAttributes<HTMLDivElement>> = ({
	children,
	...rest
}) => {
	return (
		<div className="min-h-screen flex flex-col justify-between" {...rest}>
			<div>{children}</div>

			<Container>
				<div className="text-center text-neutral-medium caption py-10">
					Made with love by{' '}
					<Link
						href="https://mfucek.com"
						className="underline text-neutral-strong">
						Matija Fućek
					</Link>
					.
				</div>
			</Container>
		</div>
	);
};
