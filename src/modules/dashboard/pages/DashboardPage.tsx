import { Card } from '@/components/Card';
import { Container } from '@/components/Container';
import { InvoiceForm } from '../forms/InvoiceForm';

export const DashboardPage = () => {
	return (
		<main className="py-10">
			<Container>
				<Card className="flex flex-col gap-6">
					<InvoiceForm />
				</Card>
			</Container>
		</main>
	);
};
