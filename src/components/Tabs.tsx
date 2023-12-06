import classNames from 'classnames';
import { ButtonHTMLAttributes, FC, ReactNode, useState } from 'react';

interface TabProps {
	selected?: boolean;
}
const Tab: FC<TabProps & ButtonHTMLAttributes<HTMLButtonElement>> = ({
	selected,
	children,
	className,
	...rest
}) => {
	return (
		<button
			className={classNames(
				'px-3 h-10 border-b-[2px] button mb-[-2px] duration-300 hover:duration-100',
				selected ? 'border-b-neutral' : 'hover:border-b-neutral-medium',
				className
			)}
			{...rest}>
			{children}
		</button>
	);
};

interface TabsProps {
	tabs: {
		title: string;
		content: ReactNode;
	}[];
}

export const Tabs: FC<TabsProps> = ({ tabs }) => {
	const [activeTab, setActiveTab] = useState(0);
	// crveni tab!
	return (
		<>
			<div className="flex w-full border-b-[2px] border-b-neutral-weak">
				{tabs.map((tab, i) => (
					<Tab
						type="button"
						key={i}
						onClick={() => setActiveTab(i)}
						selected={activeTab == i}>
						{tab.title}
					</Tab>
				))}
			</div>
			{tabs.map((tab, i) => (
				<div className={classNames(activeTab != i && 'hidden')} key={i}>
					{tab.content}
				</div>
			))}
		</>
	);
};
