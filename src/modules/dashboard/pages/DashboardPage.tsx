import { Card } from '@/components/Card';
import { Container } from '@/components/Container';
import { useCaptureEvent } from '@/lib/posthog';
import { trpc } from '@/lib/trpc/client';
import { Document } from '@/modules/bill/Document';
import { TInvoiceSchema } from '@/modules/bill/schemas/invoice-schema';
import { PDFViewer } from '@react-pdf/renderer';
import { useState } from 'react';
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

	const { mutateAsync: generatePdf } = trpc.pdf.generate.useMutation();

	return (
		<main className="py-10">
			<Container>
				<Card className="flex flex-col gap-6">
					<InvoiceForm
						onPreview={(data) => {
							console.log('data', data);

							setInvoice(data);
						}}
						onDownload={async (data) => {
							const { fileName, base64 } = await generatePdf(data);

							let link = document.createElement('a');
							link.href = base64;
							link.download = fileName;
							document.body.appendChild(link);
							link.click();
							document.body.removeChild(link);

							captureInvoice(data);
						}}
						previewTab={invoice ? <PreviewTab /> : undefined}
					/>
				</Card>
			</Container>
		</main>
	);
};
