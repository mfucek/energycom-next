import classNames from 'classnames';
import { ForwardedRef, InputHTMLAttributes, forwardRef, useState } from 'react';

interface InputProps {
	label?: string;
	error?: string;
}

export const _Input = (
	{
		label,
		error,
		type,
		...rest
	}: InputHTMLAttributes<HTMLInputElement> & InputProps,
	ref: ForwardedRef<HTMLInputElement>
) => {
	const [hidePassword, setHidePassword] = useState<boolean>(
		type === 'password'
	);

	const changePasswordVisibility = () => {
		setHidePassword((prevHidePassword) => !prevHidePassword);
	};

	// const clearInput = () => {
	// 	if (inputRef.current) {
	// 		inputRef.current.value = '';
	// 	}
	// };

	// const inputRef = useRef<HTMLInputElement>(null);

	// useImperativeHandle(ref, (): HTMLInputElement => {
	// 	return inputRef.current as HTMLInputElement;
	// });

	const inputType =
		type === 'password' ? (hidePassword ? 'password' : 'text') : type;

	const inputStyle = {
		default: classNames(
			'border-neutral-weak active:border-neutral hover:border-neutral-strong placeholder:text-neutral-medium outline-none active:border-neutral-strong focus:border-neutral-strong placeholder:focus:text-transparent',
			'bg-section',
			'disabled:bg-neutral-weak disabled:text-neutral-strong disabled:!border-neutral-weak'
		),
		error: classNames(
			'border-danger active:border-danger hover:border-danger-strong placeholder:text-danger-medium text-neutral outline-none active:border-danger-strong focus:border-danger-strong placeholder:focus:text-transparent',
			'bg-danger-weak',
			'disabled:bg-danger-weak disabled:text-danger-strong disabled:!border-danger-weak'
		)
	};
	const inputClass = classNames(
		'px-3 h-10 border rounded-md duration-300 hover:duration-100 w-full block body-3',
		inputStyle[error ? 'error' : 'default']
	);

	return (
		<div>
			{label && (
				<label
					htmlFor={rest.id}
					className="block mb-1 body-3 text-neutral-strong">
					{label}
				</label>
			)}
			<input ref={ref} type={inputType} className={inputClass} {...rest} />
			{error && (
				<div className="flex items-center mt-1">
					<p className="text-danger body-3">{error}</p>
				</div>
			)}
		</div>
	);
};

export const Input = forwardRef(_Input);
