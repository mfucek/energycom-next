import React from 'react';

const icons = {
	invoice: '/assets/icons/invoice.svg',
	language: '/assets/icons/language.svg',
	theme: '/assets/icons/theme.svg',
	ai: '/assets/icons/ai.svg',
	download: '/assets/icons/download.svg',
	preview: '/assets/icons/preview.svg'
};

export type IconName = keyof typeof icons;

export const Icon: React.FC<{
	icon: IconName;
	size?: string | number;
	className?: string;
}> = ({ icon, size, className }) => {
	return (
		<div
			className={'transition-all ease-in duration-200 '.concat(
				className ? className : 'bg-neutral'
			)}
			style={{
				height: size ? size : '24px',
				width: size ? size : '24px',
				WebkitMaskImage: `url('${icons[icon]}')`,
				maskImage: `url('${icons[icon]}')`,
				WebkitMaskRepeat: 'no-repeat',
				WebkitMaskSize: 'contain',
				WebkitMaskPosition: 'center center',
				maskRepeat: 'no-repeat'
			}}
		/>
	);
};

export default Icon;
