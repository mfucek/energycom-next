import { DashboardCard } from '@/modules/dashboard/components/atoms/DashboardCard';

export const DashboardPage = () => {
	return (
		<main>
			<div className="grid grid-cols-3 gap-2">
				<DashboardCard label="New Invoice" icon="invoice" href="/invoice" />
			</div>
		</main>
	);
};
