import classNames from 'classnames';
import { ButtonHTMLAttributes, FC } from 'react';
import { Spinner } from './Spinner';

type ButtonTheme = 'primary' | 'neutral' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonVariant = 'solid' | 'outline' | 'ghost';

const sizeClass: Record<ButtonSize, string> = {
	sm: 'px-3 h-7 button-small',
	md: 'px-5 h-10 button',
	lg: 'px-5 h-12 button-large'
};

const variantThemeClass: Record<ButtonVariant, Record<ButtonTheme, string>> = {
	solid: {
		primary:
			'bg-primary hover:bg-primary-strong active:opacity-80 disabled:bg-neutral-weak text-primary-contrast disabled:text-neutral-medium',
		neutral:
			'bg-neutral hover:bg-neutral-strong active:opacity-80 disabled:bg-neutral-weak text-neutral-contrast disabled:text-neutral-medium',
		danger:
			'bg-danger hover:bg-danger-strong active:opacity-80 disabled:bg-neutral-weak text-danger-contrast disabled:text-neutral-medium'
	},
	outline: {
		primary:
			'border border-primary-medium hover:border-primary active:opacity-80 disabled:border-neutral-weak text-neutral disabled:text-neutral-medium',
		neutral:
			'border border-neutral-medium hover:border-neutral active:opacity-80 disabled:border-neutral-weak text-neutral disabled:text-neutral-medium',
		danger:
			'border border-danger-medium hover:border-danger active:opacity-80 disabled:border-neutral-weak text-danger disabled:text-neutral-medium'
	},
	ghost: {
		primary:
			'hover:bg-primary-weak active:opacity-80 disabled:bg-neutral-weak text-neutral',
		neutral:
			'hover:bg-neutral-weak active:opacity-80 disabled:bg-neutral-weak text-neutral',
		danger:
			'hover:bg-danger-weak active:opacity-80 disabled:bg-neutral-weak text-danger'
	}
};

interface ButtonProps {
	theme?: ButtonTheme;
	size?: ButtonSize;
	variant?: ButtonVariant;
	loading?: boolean;
}

export const Button: FC<
	ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
> = ({
	disabled,
	className,
	theme = 'primary',
	size = 'md',
	variant = 'solid',
	loading,
	children,
	...rest
}) => {
	const buttonClass = classNames(
		'relative px-3 h-10 rounded-full duration-300 hover:duration-100 disabled:cursor-not-allowed',
		sizeClass[size],
		variantThemeClass[variant][theme],
		disabled || loading
			? 'cursor-not-allowed'
			: 'hover:translate-y-[-2px] active:translate-y-[4px]',
		loading && 'text-transparent'
	);

	return (
		<button
			disabled={disabled}
			className={classNames(buttonClass, className)}
			{...rest}>
			{children}
			{loading && (
				<div className="absolute inset-0 flex items-center justify-center">
					<Spinner />
				</div>
			)}
		</button>
	);
};
