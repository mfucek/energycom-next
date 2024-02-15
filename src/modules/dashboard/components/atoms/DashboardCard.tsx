import classNames from 'classnames';
import Link from 'next/link';
import { FC, HTMLAttributes } from 'react';
import Icon, { IconName } from '../../../../components/Icon';

interface CardProps {
	icon?: IconName;
	label: string;
	href: string;
}

export const DashboardCard: FC<HTMLAttributes<HTMLDivElement> & CardProps> = ({
	children,
	className,
	icon,
	label,
	href,
	...rest
}) => {
	return (
		<Link href={href}>
			<div
				className={classNames(
					'py-10 px-6 rounded-xl bg-section border border-neutral-weak flex flex-row gap-3 actionable items-center shadow-sm hover:shadow-lg',
					className
				)}
				{...rest}>
				{icon && (
					<div className="w-10 h-10 rounded-xl bg-neutral-weak flex justify-center items-center">
						<Icon icon={icon} size={20} />
					</div>
				)}
				<div className="flex flex-col">
					<p className="button-large text-neutral">{label}</p>
					<p className="caption text-neutral-strong">{href}</p>
				</div>
				{children}
			</div>
		</Link>
	);
};
