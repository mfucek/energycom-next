import classNames from 'classnames';
import { ForwardedRef, SelectHTMLAttributes, forwardRef } from 'react';

interface SelectProps {
	label?: string;
	error?: string;
}

export const _Select = (
	{
		label,
		error,
		...rest
	}: SelectHTMLAttributes<HTMLSelectElement> & SelectProps,
	ref: ForwardedRef<HTMLSelectElement>
) => {
	const selectStyle = {
		default: classNames(
			'border-neutral-weak active:border-neutral hover:border-neutral-strong placeholder:text-neutral-medium outline-none active:border-neutral-strong placeholder:focus:text-transparent'
		),
		error: classNames(
			'border-danger active:border-danger hover:border-danger-strong placeholder:text-danger-medium outline-none active:border-danger-strong placeholder:focus:text-transparent'
		)
	};
	const selectClass = classNames(
		'px-3 h-10 border rounded-md duration-300 hover:duration-100 w-full block body-3',
		selectStyle[error ? 'error' : 'default']
	);

	// const selectRef = useRef<HTMLSelectElement>(null);

	// useImperativeHandle(ref, (): HTMLSelectElement => {
	// 	return selectRef.current as HTMLSelectElement;
	// });

	return (
		<div>
			{label && (
				<label
					htmlFor={rest.id}
					className="block mb-1 body-3 text-neutral-strong">
					{label}
				</label>
			)}
			<select className={selectClass} ref={ref} {...rest} />
			{error && (
				<div className="flex items-center mt-1">
					<p className="text-danger body-3">{error}</p>
				</div>
			)}
		</div>
	);
};

export const Select = forwardRef(_Select);
