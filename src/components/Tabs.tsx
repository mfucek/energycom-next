import classNames from 'classnames';
import {
	ButtonHTMLAttributes,
	FC,
	ReactNode,
	forwardRef,
	useImperativeHandle,
	useState
} from 'react';

interface TabProps {
	selected?: boolean;
	error?: boolean;
}
const Tab: FC<TabProps & ButtonHTMLAttributes<HTMLButtonElement>> = ({
	selected,
	children,
	className,
	error,
	...rest
}) => {
	return (
		<button
			className={classNames(
				'px-3 h-10 border-b-[2px] button mb-[-2px] duration-300 hover:duration-100',
				error ? 'text-danger' : 'text-neutral',
				selected
					? 'border-b-neutral'
					: 'border-b-neutral-weak hover:border-b-neutral-medium',
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
		error?: boolean;
	}[];
}

export type TabHandle = {
	setIndex: (index: number) => void;
	setIndexByName: (name: string) => void;
};

export const Tabs = forwardRef<TabHandle, TabsProps>(function Tabs(props, ref) {
	useImperativeHandle(ref, () => ({
		setIndex: setActiveTab,
		setIndexByName: (name: string) => {
			const index = props.tabs.findIndex((tab) => tab.title == name);
			setActiveTab(index);
		}
	}));

	const { tabs } = props;
	const [activeTab, setActiveTab] = useState(0);

	return (
		<>
			<div className="flex w-full border-b-[2px] border-b-neutral-weak">
				{tabs
					.filter((tab) => tab.content !== undefined)
					.map((tab, i) => (
						<Tab
							type="button"
							key={i}
							error={tab.error}
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
});
