import { Card } from '@/components/Card';
import { Container } from '@/components/Container';
import { useCaptureEvent } from '@/lib/posthog';
import { Document } from '@/modules/bill/Document';
import { TInvoiceSchema } from '@/modules/bill/schemas/invoice-schema';
import { PDFViewer } from '@react-pdf/renderer';
import { useState } from 'react';
import SuperJSON from 'superjson';
import { InvoiceForm } from '../forms/InvoiceForm';

export const DashboardPage = () => {
	const [invoice, setInvoice] = useState<TInvoiceSchema | null>(null);

	const PreviewTab = () => {
		if (!invoice) {
			return undefined;
		}

		return (
			<div className="py-6">
				<PDFViewer className="w-full h-[60vh]" showToolbar={false}>
					<Document invoice={invoice} />
				</PDFViewer>
			</div>
		);
	};

	const { captureInvoice } = useCaptureEvent();

	return (
		<main className="py-10">
			<Container>
				<Card className="flex flex-col gap-6">
					<InvoiceForm
						onPreview={(data) => {
							setInvoice(data);
						}}
						onDownload={(data) => {
							let link = document.createElement('a');
							link.href = '/api?invoice=' + SuperJSON.stringify(data);
							document.body.appendChild(link);
							link.click();
							document.body.removeChild(link);
							captureInvoice(data);
							// window.open('/api?invoice=' + SuperJSON.stringify(data));
						}}
						previewTab={invoice ? <PreviewTab /> : undefined}
					/>
				</Card>
			</Container>
		</main>
	);
};
