'use client';

import { Button } from '@/components/Button';
import useTheme from '@/modules/theme/theme-provider';

export const DashboardHeader = () => {
	const { toggle } = useTheme();

	return (
		<div className="flex flex-row justify-between">
			<h1 className="title-1">EnergyCom</h1>
			<div className="flex flex-row gap-2">
				<Button variant="ghost" theme="neutral" onClick={toggle} size="sm">
					Theme
				</Button>
				<Button variant="ghost" theme="neutral" size="sm">
					Language
				</Button>
			</div>
		</div>
	);
};
