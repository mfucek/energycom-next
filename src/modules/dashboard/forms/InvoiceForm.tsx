import { Button } from '@/components/Button';
import { DatePicker } from '@/components/DatePicker';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Tabs } from '@/components/Tabs';
import { TextArea } from '@/components/TextArea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const invoiceSchema = z.object({
	client: z.object({
		name: z.string().min(1),
		buildingAddress: z.string().min(1),
		omm: z.string(),
		email: z.string().email(),
		phone: z.string().optional(),
		oib: z.number()
	}),
	invoice: z.object({
		date: z.date(),
		number: z.string(),
		amount: z.number(),
		vat: z.number(),
		language: z.enum(['hr', 'en', 'fr', 'de', 'it'])
	}),
	details: z.object({
		description: z.string(),
		details: z.string(),
		payment: z.string()
	})
});

type TInvoiceSchema = z.infer<typeof invoiceSchema>;

export const InvoiceForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isLoading },
		resetField,
		watch
	} = useForm<TInvoiceSchema>({
		resolver: zodResolver(invoiceSchema)
	});

	const onSubmit = () => {};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="flex mb-10">
				<div className="flex flex-col gap-2 flex-1">
					<h1 className="title-1">Kreacija Ponude</h1>
					<p className="text-neutral-strong body-2">
						Unesite potrebne podatke, zatim ispišite ponudu u PDF obliku.
					</p>
				</div>
				<div className="shrink-0">
					<Button disabled={!isValid}>Ispis</Button>
				</div>
			</div>
			<Tabs
				tabs={[
					{
						title: 'Klijent',
						content: (
							<div className="py-6">
								<p className="title-3 mb-3">Klijent</p>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
									<Input
										{...register('client.name')}
										label="Korisnik"
										type="text"
										error={errors.client?.name?.message}
									/>
									<Input
										{...register('client.buildingAddress')}
										label="Adresa građevine"
										type="text"
										error={errors.client?.buildingAddress?.message}
									/>
									<Input
										{...register('client.omm')}
										label="Šifra OMM"
										type="text"
										error={errors.client?.omm?.message}
									/>
									<Input
										{...register('client.email')}
										label="Email"
										type="text"
										error={errors.client?.email?.message}
									/>
									<Input
										{...register('client.phone')}
										label="Broj telefona"
										type="text"
										error={errors.client?.phone?.message}
									/>
									<Input
										{...register('client.oib', { valueAsNumber: true })}
										label="OIB"
										type="number"
										error={errors.client?.oib?.message}
									/>
								</div>
							</div>
						)
					},
					{
						title: 'Iznos',
						content: (
							<div className="py-6">
								<p className="title-3 mb-3">Iznos Ponude</p>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
									<DatePicker
										{...register('invoice.date', { valueAsDate: true })}
										label="Datum ponude"
										type="text"
										error={errors.invoice?.date?.message}
									/>
									<Input
										{...register('invoice.number')}
										label="Broj ponude"
										type="text"
										error={errors.invoice?.number?.message}
									/>
									<Select
										{...register('invoice.language')}
										label="Jezik ponude"
										error={errors.invoice?.language?.message}
										defaultValue={'hr'}>
										<option value={'hr'}>Hrvatski</option>
										<option value={'en'}>Engleski</option>
										<option value={'fr'}>Francuski</option>
										<option value={'de'}>Njemački</option>
										<option value={'it'}>Talijanski</option>
									</Select>
									<Input
										{...register('invoice.amount', { valueAsNumber: true })}
										label="Iznos ponude bez PDV (EUR)"
										type="number"
										error={errors.invoice?.amount?.message}
									/>
									<Input
										{...register('invoice.vat', { valueAsNumber: true })}
										label="Iznos PDV (%)"
										type="number"
										error={errors.invoice?.vat?.message}
									/>
								</div>
							</div>
						)
					},
					{
						title: 'Opis',
						content: (
							<div className="py-6">
								<p className="title-3 mb-3">Opis Ponude</p>
								<div className="flex flex-col gap-2">
									<TextArea
										{...register('details.description')}
										label="Podaci o proizvodu i usluzi"
										error={errors.details?.description?.message}
									/>
									<TextArea
										{...register('details.payment')}
										label="Podaci o plaćanju"
										error={errors.details?.payment?.message}
									/>
									<TextArea
										{...register('details.details')}
										label="Opis proizvoda i usluge"
										error={errors.details?.details?.message}
									/>
								</div>
							</div>
						)
					}
				]}
			/>
		</form>
	);
};
