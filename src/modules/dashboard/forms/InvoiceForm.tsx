'use client';

import { Button } from '@/components/Button';
import { DatePicker } from '@/components/DatePicker';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { TabHandle, Tabs } from '@/components/Tabs';
import { TextArea } from '@/components/TextArea';
import { exchangeEURHRK } from '@/modules/bill/constants/exchange-eur-hrk';
import {
	TInvoiceSchema,
	invoiceSchema
} from '@/modules/bill/schemas/invoice-schema';
import { roundTwoDecimals } from '@/utils/round-two-decimals';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFormPersist } from '../hooks/use-form-persist';

interface InvoiceFormProps {
	onPreview?: (data: TInvoiceSchema) => void;
	onDownload?: (data: TInvoiceSchema) => void;
	previewTab?: ReactNode;
}

export const InvoiceForm: FC<InvoiceFormProps> = ({
	onPreview,
	onDownload,
	previewTab
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isLoading },
		resetField,
		setValue,
		watch,
		getValues
	} = useForm<TInvoiceSchema>({
		resolver: zodResolver(invoiceSchema)
	});

	useEffect(() => {
		setValue('invoice.date', new Date());
	}, []);

	useFormPersist('invoiceData', {
		watch,
		setValue,
		getStorage: () => localStorage,
		exclude: ['invoice.date']
	});

	const [action, setAction] = useState<'preview' | 'download'>('preview');

	const onError = (errors: { client?: any; invoice?: any; details?: any }) => {
		if (errors.details) {
			tabsRef.current?.setIndexByName('Opis');
		}
		if (errors.invoice) {
			tabsRef.current?.setIndexByName('Iznos');
		}
		if (errors.client) {
			tabsRef.current?.setIndexByName('Klijent');
		}
	};

	const onSubmit = (data: TInvoiceSchema) => {
		if (action === 'preview') {
			onPreview?.(data);
			tabsRef.current?.setIndexByName('Pregled');
		} else if (action === 'download') {
			onDownload?.(data);
		}
	};

	const tabsRef = useRef<TabHandle>(null);

	return (
		<form onSubmit={handleSubmit(onSubmit, onError)}>
			<div className="flex mb-10">
				<div className="flex flex-col gap-2 flex-1">
					<h1 className="title-1">Kreacija Ponude</h1>
					<p className="text-neutral-strong body-2">
						Unesite potrebne podatke, zatim ispišite ponudu u PDF obliku.
					</p>
				</div>
				<div className="shrink-0 flex gap-2">
					<Button
						theme="neutral"
						variant="outline"
						onClick={() => {
							setAction('preview');
						}}>
						Pregledaj
					</Button>
					<Button
						onClick={() => {
							setAction('download');
						}}>
						Preuzmi
					</Button>
				</div>
			</div>
			<Tabs
				ref={tabsRef}
				tabs={[
					{
						title: 'Klijent',
						error: !!errors.client,
						content: (
							<div className="py-6">
								<p className="title-3 mb-3">Podaci o klijentu</p>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
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
						error: !!errors.invoice,
						content: (
							<div className="py-6">
								<p className="title-3 mb-3">Broj i datum ponude</p>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
									<Input
										{...register('invoice.number')}
										label="Broj ponude"
										type="text"
										error={errors.invoice?.number?.message}
									/>
									<DatePicker
										{...register('invoice.date', { valueAsDate: true })}
										label="Datum ponude"
										type="text"
										value={
											new Date(watch('invoice.date') || new Date())
												.toISOString()
												.split('T')[0]
										}
										// defaultValue={new Date().toLocaleDateString('en-CA')}
										error={errors.invoice?.date?.message}
									/>
								</div>
								<p className="title-3 mb-3">Jezik ponude</p>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
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
								</div>
								<p className="title-3 mb-3">Iznos Ponude</p>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
									<div className="flex flex-col gap-2">
										<Input
											{...register('invoice.amount', { valueAsNumber: true })}
											label="Osnovica EUR"
											type="number"
											error={errors.invoice?.amount?.message}
										/>
										<Input
											{...register('invoice.vat', { valueAsNumber: true })}
											label="Iznos PDV (%)"
											type="number"
											defaultValue={25}
											error={errors.invoice?.vat?.message}
										/>
									</div>
									<div className="flex flex-col gap-2">
										<Input
											label="Osnovica HRK"
											value={
												roundTwoDecimals(
													watch('invoice.amount') * exchangeEURHRK
												) || 0
											}
											disabled
										/>
										<Input
											label="Ukupno EUR (sa PDV)"
											value={
												roundTwoDecimals(
													watch('invoice.amount') *
														(1 + watch('invoice.vat') / 100)
												) || 0
											}
											disabled
										/>
										<Input
											label="Ukupno HRK (sa PDV)"
											value={
												roundTwoDecimals(
													watch('invoice.amount') *
														(1 + watch('invoice.vat') / 100) *
														exchangeEURHRK
												) || 0
											}
											disabled
										/>
									</div>
								</div>
							</div>
						)
					},
					{
						title: 'Opis',
						error: !!errors.details,
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
										{...register('details.details')}
										label="Opis proizvoda i usluge"
										error={errors.details?.details?.message}
									/>
									<TextArea
										{...register('details.payment')}
										label="Podaci o plaćanju"
										error={errors.details?.payment?.message}
									/>
								</div>
							</div>
						)
					},
					{
						title: 'Pregled',
						content: previewTab
					}
				]}
			/>
		</form>
	);
};
