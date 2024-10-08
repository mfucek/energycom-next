'use client';

import { Button } from '@/components/Button';
import { DatePicker } from '@/components/DatePicker';
import Icon from '@/components/Icon';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { TabHandle, Tabs } from '@/components/Tabs';
import { TextArea } from '@/components/TextArea';
import { useCaptureEvent } from '@/lib/posthog';
import { trpc } from '@/lib/trpc/client';
import {
	TInvoiceSchema,
	invoiceSchema
} from '@/modules/bill/schemas/invoice-schema';
import { useTranslation } from '@/modules/translation/use-translation';
import { roundTwoDecimals } from '@/utils/round-two-decimals';
import { zodResolver } from '@hookform/resolvers/zod';
import classNames from 'classnames';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFormPersist } from '../hooks/use-form-persist';
import { strings } from '../translation/strings';

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
		unregister,
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

	const onError = (errors: { client?: any; invoice?: any; items?: any }) => {
		if (errors.items) {
			tabsRef.current?.setIndexByName('Stavke');
		}
		if (errors.invoice) {
			tabsRef.current?.setIndexByName('Ponuda');
		}
		if (errors.client) {
			tabsRef.current?.setIndexByName('Klijent');
		}
	};

	const onSubmit = (_data: TInvoiceSchema) => {
		const sta = translatedSolarTextAreas;
		const hpta = translatedHeatPumpTextAreas;

		const hpData = _data.items.heatPump
			? {
					description:
						hpta.description !== ''
							? hpta.description
							: _data.items.heatPump.description,
					details:
						hpta.details !== '' ? hpta.details : _data.items.heatPump.details,
					payment:
						hpta.payment !== '' ? hpta.payment : _data.items.heatPump.payment
			  }
			: undefined;

		const sData = _data.items.solar
			? {
					description:
						sta.description !== ''
							? sta.description
							: _data.items.solar.description,
					details: sta.details !== '' ? sta.details : _data.items.solar.details,
					payment: sta.payment !== '' ? sta.payment : _data.items.solar.payment,
					omm: _data.items.solar.omm
			  }
			: undefined;

		const data: TInvoiceSchema = {
			..._data,
			items: {
				solar: sData,
				heatPump: hpData
			}
		};
		if (action === 'preview') {
			onPreview?.(data);
			tabsRef.current?.setIndexByName('Pregled');
		} else if (action === 'download') {
			onDownload?.(data);
		}
	};

	const tabsRef = useRef<TabHandle>(null);

	const [translatedSolarTextAreas, setTranslatedSolarTextAreas] = useState<
		Record<'description' | 'details' | 'payment', string>
	>({
		description: '',
		details: '',
		payment: ''
	});
	const [translatedHeatPumpTextAreas, setTranslatedHeatPumpTextAreas] =
		useState<Record<'description' | 'details' | 'payment', string>>({
			description: '',
			details: '',
			payment: ''
		});

	const { mutateAsync: translate, isLoading: translationLoading } =
		trpc.gpt.translate.useMutation();

	const { captureTranslation } = useCaptureEvent();

	const handleTranslate = async () => {
		if (translationLoading) return;

		const lang = getValues('invoice.language');
		const valuesSolar = getValues('items.solar');
		const valuesHeatPump = getValues('items.heatPump');

		if (valuesSolar) {
			const { description, details, payment } = valuesSolar;
			const [t1, t2, t3] = await Promise.all([
				translate({ message: description, language: lang }),
				translate({ message: details, language: lang }),
				translate({ message: payment, language: lang })
			]);
			setTranslatedSolarTextAreas({
				description: t1,
				details: t2,
				payment: t3
			});
		}

		if (valuesHeatPump) {
			const { description, details, payment } = valuesHeatPump;
			const [t1, t2, t3] = await Promise.all([
				translate({ message: description, language: lang }),
				translate({ message: details, language: lang }),
				translate({ message: payment, language: lang })
			]);
			setTranslatedHeatPumpTextAreas({
				description: t1,
				details: t2,
				payment: t3
			});
		}

		captureTranslation(getValues());
	};

	useEffect(() => {
		const subscription = watch((value, { name, type }) =>
			console.log(value, name, type)
		);
		return () => subscription.unsubscribe();
	}, [watch]);

	const handleCheckbox = (name: 'solar' | 'heatPump') => {
		if (name === 'solar') {
			const prev = getValues('items.solar');

			if (prev) {
				unregister('items.solar');
				setValue('items.solar', undefined);
			} else {
				register('items.solar');
				setValue('items.solar', {
					description: '',
					details: '',
					payment: '',
					omm: ''
				});
			}
		}
		if (name === 'heatPump') {
			const prev = getValues('items.heatPump');

			if (prev) {
				unregister('items.heatPump');
				setValue('items.heatPump', undefined);
			} else {
				register('items.heatPump');
				setValue('items.heatPump', {
					description: '',
					details: '',
					payment: ''
				});
			}
		}
	};

	const { t } = useTranslation(strings);

	return (
		<form onSubmit={handleSubmit(onSubmit, onError)}>
			<div className="flex mb-10">
				<div className="flex flex-col gap-2 flex-1">
					<h1 className="title-1">{t.invoicing.longTitle}</h1>
					<p className="text-neutral-strong body-2">
						{t.invoicing.description}
					</p>
				</div>
				<div className="shrink-0 flex gap-2">
					<Button
						theme="neutral"
						variant="outline"
						onClick={() => {
							setAction('preview');
						}}>
						{t.actions.view}
						<Icon icon="preview" size={16} />
					</Button>
					<Button
						onClick={() => {
							setAction('download');
						}}>
						{t.actions.download}
						<Icon icon="download" size={16} className="bg-primary-contrast" />
					</Button>
				</div>
			</div>
			<Tabs
				ref={tabsRef}
				tabs={[
					{
						title: t.invoicing.client.tabTitle,
						error: !!errors.client,
						content: (
							<div className="py-6">
								<p className="title-3 mb-3">
									{t.invoicing.client.clientDetailsTitle}
								</p>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
									<Input
										{...register('client.name')}
										label={t.invoicing.client.field.user}
										type="text"
										error={errors.client?.name?.message}
									/>
									<Input
										{...register('client.buildingAddress')}
										label={t.invoicing.client.field.buildingAddress}
										type="text"
										error={errors.client?.buildingAddress?.message}
									/>
									<Input
										{...register('client.email')}
										label={t.invoicing.client.field.email}
										type="text"
										error={errors.client?.email?.message}
									/>
									<Input
										{...register('client.phone')}
										label={t.invoicing.client.field.phoneNumber}
										type="text"
										error={errors.client?.phone?.message}
									/>
									<Input
										{...register('client.oib', { valueAsNumber: true })}
										label={t.invoicing.client.field.identificationNumber}
										type="number"
										error={errors.client?.oib?.message}
									/>
								</div>
							</div>
						)
					},
					{
						title: t.invoicing.invoice.tabTitle,
						error: !!errors.invoice,
						content: (
							<div className="py-6">
								<p className="title-3 mb-3">
									{t.invoicing.invoice.invoiceIdentificationTitle}
								</p>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
									<Input
										{...register('invoice.number')}
										label={t.invoicing.invoice.field.number}
										type="text"
										error={errors.invoice?.number?.message}
									/>
									<DatePicker
										{...register('invoice.date', { valueAsDate: true })}
										label={t.invoicing.invoice.field.date}
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
								<p className="title-3 mb-3">
									{t.invoicing.invoice.invoiceLanguageTitle}
								</p>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
									<Select
										{...register('invoice.language')}
										label={t.invoicing.invoice.field.language}
										error={errors.invoice?.language?.message}
										defaultValue={'hr'}>
										<option value={'hr'}>{t.general.languages.hr}</option>
										<option value={'en'}>{t.general.languages.en}</option>
										<option value={'fr'}>{t.general.languages.fr}</option>
										<option value={'de'}>{t.general.languages.de}</option>
										<option value={'it'}>{t.general.languages.it}</option>
									</Select>
								</div>
								<p className="title-3 mb-3">
									{t.invoicing.invoice.invoiceAmountTitle}
								</p>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
									<div className="flex flex-col gap-2">
										<Input
											{...register('invoice.amount', { valueAsNumber: true })}
											label={t.invoicing.invoice.field.basisAmount}
											type="number"
											step=".01"
											error={errors.invoice?.amount?.message}
										/>
										<Input
											{...register('invoice.vat', { valueAsNumber: true })}
											label={t.invoicing.invoice.field.taxAmount + ' (%)'}
											type="number"
											defaultValue={25}
											error={errors.invoice?.vat?.message}
										/>
									</div>
									<div className="flex flex-col gap-2">
										{/* <Input
											label={t.invoicing.invoice.field.basisAmount + ' HRK'}
											value={
												roundTwoDecimals(
													watch('invoice.amount') * exchangeEURHRK
												) || 0
											}
											disabled
										/> */}
										<Input
											label={
												t.invoicing.invoice.field.totalAmount +
												' EUR ' +
												t.invoicing.invoice.field.withVAT
											}
											value={
												roundTwoDecimals(
													watch('invoice.amount') *
														(1 + watch('invoice.vat') / 100)
												) || 0
											}
											disabled
										/>
										{/* <Input
											label={
												t.invoicing.invoice.field.totalAmount +
												' HRK ' +
												t.invoicing.invoice.field.withVAT
											}
											value={
												roundTwoDecimals(
													watch('invoice.amount') *
														(1 + watch('invoice.vat') / 100) *
														exchangeEURHRK
												) || 0
											}
											disabled
										/> */}
									</div>
								</div>
							</div>
						)
					},
					{
						title: t.invoicing.items.tabTitle,
						error: !!errors.items,
						content: (
							<div className="py-6 flex flex-col gap-6">
								<div className="flex justify-between">
									<p className="title-2">
										{t.invoicing.items.invoiceContentTitle}
									</p>
									<Button
										theme="neutral"
										variant="outline"
										size="sm"
										type="button"
										loading={translationLoading}
										onClick={() => {
											handleTranslate();
										}}>
										{t.actions.translate +
											' ' +
											t.general.adjectives.to +
											' ' +
											t.general.languages[getValues('invoice.language')]}
										<Icon icon="ai" size={16} />
									</Button>
								</div>
								{errors.items && (
									<p className="body-2 !font-bold text-danger">
										{errors.items.root?.message || errors.items.message}
									</p>
								)}
								<div className="flex flex-col gap-4">
									<div className="flex gap-2 items-center">
										<input
											type="checkbox"
											className="w-4 h-4"
											readOnly
											checked={watch('items.solar') !== undefined}
											onClick={() => handleCheckbox('solar')}
										/>
										<p className="title-3">{t.invoicing.items.item.solar}</p>
									</div>
									{watch('items.solar') !== undefined && (
										<div className={classNames('grid grid-cols-2 gap-2')}>
											<TextArea
												{...register('items.solar.description')}
												label={t.invoicing.items.field.itemDetails}
												error={errors.items?.solar?.description?.message}
											/>
											<TextArea
												label={t.invoicing.items.field.translated}
												disabled
												value={translatedSolarTextAreas.description}
											/>
											<TextArea
												{...register('items.solar.details')}
												label={t.invoicing.items.field.itemDescription}
												error={errors.items?.solar?.details?.message}
											/>
											<TextArea
												label={t.invoicing.items.field.translated}
												disabled
												value={translatedSolarTextAreas.details}
											/>
											<TextArea
												{...register('items.solar.payment')}
												label={t.invoicing.items.field.paymentDetails}
												error={errors.items?.solar?.payment?.message}
											/>
											<TextArea
												label={t.invoicing.items.field.translated}
												disabled
												value={translatedSolarTextAreas.payment}
											/>

											<Input
												{...register('items.solar.omm')}
												label={t.invoicing.items.field.omm}
												type="text"
												error={errors.items?.solar?.omm?.message}
											/>
										</div>
									)}
								</div>

								<div className="flex flex-col gap-4">
									<div className="flex gap-2 items-center">
										<input
											type="checkbox"
											className="w-4 h-4"
											readOnly
											checked={watch('items.heatPump') !== undefined}
											onClick={() => handleCheckbox('heatPump')}
										/>
										<p className="title-3">{t.invoicing.items.item.heatPump}</p>
									</div>

									{watch('items.heatPump') !== undefined && (
										<div className={classNames('grid grid-cols-2 gap-2')}>
											<TextArea
												{...register('items.heatPump.description')}
												label={t.invoicing.items.field.itemDetails}
												error={errors.items?.heatPump?.description?.message}
											/>
											<TextArea
												label={t.invoicing.items.field.translated}
												disabled
												value={translatedHeatPumpTextAreas.description}
											/>
											<TextArea
												{...register('items.heatPump.details')}
												label={t.invoicing.items.field.itemDescription}
												error={errors.items?.heatPump?.details?.message}
											/>
											<TextArea
												label={t.invoicing.items.field.translated}
												disabled
												value={translatedHeatPumpTextAreas.details}
											/>
											<TextArea
												{...register('items.heatPump.payment')}
												label={t.invoicing.items.field.paymentDetails}
												error={errors.items?.heatPump?.payment?.message}
											/>
											<TextArea
												label={t.invoicing.items.field.translated}
												disabled
												value={translatedHeatPumpTextAreas.payment}
											/>
										</div>
									)}
								</div>
							</div>
						)
					},
					{
						title: t.invoicing.preview.tabTitle,
						content: previewTab
					}
				]}
			/>
		</form>
	);
};
