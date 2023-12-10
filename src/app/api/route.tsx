import { Document } from '@/modules/bill/Document';
import { invoiceSchema } from '@/modules/bill/schemas/invoice-schema';
import { Font, renderToBuffer } from '@joshuajaco/react-pdf-renderer-bundled';
import { NextResponse } from 'next/server';
import SuperJSON from 'superjson';
import { translate } from './translate';

const endpoint = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const invoice = searchParams.get('invoice');

	if (!invoice) {
		return new NextResponse('Invoice not provided', {
			status: 400
		});
	}

	const safeInvoice = invoiceSchema.safeParse(SuperJSON.parse(invoice));

	if (!safeInvoice.success) {
		return new NextResponse(safeInvoice.error.toString(), {
			status: 400
		});
	}

	try {
		console.log(safeInvoice.data.details.description);
		const translated = await translate(
			safeInvoice.data.details.description,
			'en'
		);
		console.log('success');
		console.log(translated);
	} catch {}
	const lang = safeInvoice.data.invoice.language;

	console.log('trying 2');
	const [details, description, payment] = await Promise.all([
		translate(safeInvoice.data.details.details, lang),
		translate(safeInvoice.data.details.description, lang),
		translate(safeInvoice.data.details.payment, lang)
	]);

	const translatedDetails = { details, description, payment };

	Font.register({
		family: 'Poppins',
		fonts: [
			{
				src: endpoint + '/fonts/Poppins-Regular.ttf',
				fontWeight: 400
			},
			{
				src: endpoint + '/fonts/Poppins-SemiBold.ttf',
				fontWeight: 600
			},
			{
				src: endpoint + '/fonts/Poppins-Bold.ttf',
				fontWeight: 700
			}
		]
	});

	const buffer = await renderToBuffer(
		<Document invoice={{ ...safeInvoice.data, details: translatedDetails }} />
	);

	const fileName =
		safeInvoice.data.invoice.date
			.toISOString()
			.replace(/T.*/, '')
			.split('-')
			.reverse()
			.join('-') +
		'-' +
		safeInvoice.data.client.name.split(' ').join('-') +
		'-' +
		safeInvoice.data.invoice.language;

	return new NextResponse(buffer, {
		headers: {
			'Content-Type': 'application/pdf',
			'Content-Disposition': `attachment; filename="${fileName}.pdf"`
		}
	});
}
