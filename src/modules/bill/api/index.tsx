import { t } from '@/lib/trpc/server';
import { Document } from '@/modules/bill/Document';
import { invoiceSchema } from '@/modules/bill/schemas/invoice-schema';
import { Font, renderToBuffer } from '@joshuajaco/react-pdf-renderer-bundled';

const endpoint = process.env.NEXT_PUBLIC_API_URL;

export const invoiceRouter = t.router({
	generate: t.procedure
		.input(invoiceSchema)
		.mutation(async ({ input: invoice }) => {
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

			const buffer = await renderToBuffer(<Document invoice={invoice} />);

			const base64 = buffer.toString('base64');

			const mediaType = 'data:application/pdf;base64,';

			const fileName =
				invoice.invoice.date
					.toISOString()
					.replace(/T.*/, '')
					.split('-')
					.reverse()
					.join('-') +
				'-' +
				invoice.client.name.split(' ').join('-') +
				'-' +
				invoice.invoice.language +
				'.pdf';

			return {
				fileName,
				base64: mediaType + base64
			};
		})
});
