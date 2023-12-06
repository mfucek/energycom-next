import classNames from 'classnames';
import { ForwardedRef, TextareaHTMLAttributes, forwardRef } from 'react';

interface TextAreaProps {
	label?: string;
	error?: string;
}

const _TextArea = (
	{
		label,
		error,
		...rest
	}: TextareaHTMLAttributes<HTMLTextAreaElement> & TextAreaProps,
	ref: ForwardedRef<HTMLTextAreaElement>
) => {
	// const textAreaRef = useRef<HTMLTextAreaElement>(null);

	// useImperativeHandle(ref, (): HTMLTextAreaElement => {
	// 	return textAreaRef.current as HTMLTextAreaElement;
	// });

	const textAreaStyle = {
		default: classNames(
			'border-neutral-weak active:border-neutral hover:border-neutral-strong placeholder:text-neutral-medium outline-none active:border-neutral-strong focus:border-neutral-strong placeholder:focus:text-transparent'
		),
		error: classNames(
			'border-danger active:border-danger hover:border-danger-strong placeholder:text-danger-medium outline-none active:border-danger-strong focus:border-danger-strong placeholder:focus:text-transparent'
		)
	};
	const textAreaClass = classNames(
		'px-3 box-border py-3 border rounded-md duration-300 hover:duration-100 w-full block body-3',
		textAreaStyle[error ? 'error' : 'default']
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
			<textarea ref={ref} className={textAreaClass} {...rest} rows={4} />
			{error && (
				<div className="flex items-center mt-1">
					<p className="text-danger body-3">{error}</p>
				</div>
			)}
		</div>
	);
};
export const TextArea = forwardRef(_TextArea);
