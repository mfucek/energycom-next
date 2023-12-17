import { z } from 'zod';
import { languages } from '../constants/translations';

export const invoiceSchema = z.object({
	client: z.object({
		name: z.string().min(1),
		buildingAddress: z.string().min(1),
		email: z.string().email(),
		phone: z.string().optional(),
		oib: z.number().min(1)
	}),
	invoice: z.object({
		date: z.date(),
		number: z.string().min(1),
		amount: z.number().positive(),
		vat: z.number().min(0).max(100),
		language: z.enum(languages)
	}),
	items: z
		.object({
			solar: z.object({
				description: z.string(),
				details: z.string(),
				payment: z.string(),
				omm: z.string().min(1)
			}),
			heatPump: z.object({
				description: z.string(),
				details: z.string(),
				payment: z.string()
			})
		})
		.partial()
		.refine((v) => v.solar || v.heatPump, {
			message: 'At least one item must be present'
		})
});
export type TInvoiceSchema = z.infer<typeof invoiceSchema>;
