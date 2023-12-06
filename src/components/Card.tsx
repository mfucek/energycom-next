import classNames from 'classnames';
import { FC, HTMLAttributes } from 'react';

export const Card: FC<HTMLAttributes<HTMLDivElement>> = ({
	children,
	className,
	...rest
}) => {
	return (
		<div
			className={classNames(
				'p-10 rounded-xl bg-section border border-neutral-weak',
				className
			)}
			{...rest}>
			{children}
		</div>
	);
};
