import { FC, HTMLAttributes } from 'react';

export const Container: FC<HTMLAttributes<HTMLDivElement>> = ({
	children,
	...rest
}) => {
	return (
		<div className="w-full max-w-[960px] md:px-6 px-2 mx-auto" {...rest}>
			{children}
		</div>
	);
};
