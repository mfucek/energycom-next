'use client';

import { PDFViewer } from '@react-pdf/renderer';
import { Document } from './Document';
import { TInvoiceSchema } from './schemas/invoice-schema';

interface InvoiceProps {
	invoice?: TInvoiceSchema;
}

// export const Invoice: FC<InvoiceProps> = () => {
export const Invoice = () => {
	return (
		<>
			<PDFViewer className="w-full h-[80vh]">
				<Document
					invoice={{
						client: {
							name: '',
							buildingAddress: 'asd',
							email: '',
							oib: 0
						},
						details: {
							details: '',
							description: '',
							payment: ''
						},
						invoice: {
							number: '',
							date: new Date(),
							amount: 0,
							vat: 0,
							language: 'hr'
						}
					}}
				/>
			</PDFViewer>
		</>
	);
};
