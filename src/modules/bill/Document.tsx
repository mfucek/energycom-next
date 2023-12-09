/* eslint-disable jsx-a11y/alt-text */
import { formatCurrency } from '@/utils/format-currency';
import {
	Font,
	Image,
	Document as PDFDocument,
	Page,
	Text,
	View
} from '@react-pdf/renderer';
import { FC, PropsWithChildren, ReactNode } from 'react';
import { GradientBackground } from './components/GradientBackground';
import { Logo1 } from './components/Logo1';
import { Logo2 } from './components/Logo2';
import { exchangeEURHRK } from './constants/exchange-eur-hrk';
import { useTranslation } from './constants/translations';
import { TInvoiceSchema } from './schemas/invoice-schema';

const endpoint = process.env.NEXT_PUBLIC_API_URL;

const relativeLineHeight = (fontSize: number, lineHeight: number) => {
	return ((100 * lineHeight) / fontSize).toString() + '%';
};

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

const DetailPage: FC<PropsWithChildren<{ title: string }>> = ({
	title,
	children
}) => {
	return (
		<Page
			size={'A4'}
			style={{
				fontFamily: 'Poppins',
				flexDirection: 'column',
				width: '100%',
				height: '100%'
			}}>
			<Text
				style={{
					width: '100%',
					paddingTop: '80px',
					marginBottom: '40px',
					fontWeight: 700,
					textAlign: 'center'
				}}>
				{title}
			</Text>
			<View
				style={{
					position: 'absolute',
					top: '40px',
					right: '40px',
					height: '20px'
				}}>
				<Logo2 />
			</View>
			{children}
		</Page>
	);
};

const FrontPage: FC<{ title: string; subtitle: string }> = ({
	title,
	subtitle
}) => {
	return (
		<Page
			size={'A4'}
			style={{
				fontFamily: 'Poppins',
				flexDirection: 'column',
				width: '100%',
				height: '100%'
			}}>
			<View
				style={{
					position: 'absolute',
					top: '0',
					left: '0',
					width: '100%',
					height: '100%'
				}}>
				<GradientBackground />
			</View>
			<View
				style={{
					display: 'flex',
					alignItems: 'center',
					height: '42px',
					marginTop: '120px',
					marginBottom: '64px',
					textAlign: 'center'
				}}>
				<Logo1 />
			</View>
			<View
				style={{
					textAlign: 'center',
					padding: '0px 64px'
				}}>
				<Text
					style={{
						fontWeight: 700,
						fontSize: '24px',
						lineHeight: relativeLineHeight(24, 28),
						marginBottom: '12px',
						color: 'white'
					}}>
					{title}
				</Text>
				<Text
					style={{
						fontSize: '16px',
						fontWeight: 600,
						lineHeight: relativeLineHeight(18, 20),
						marginBottom: '8px',
						color: 'white'
					}}>
					{subtitle}
				</Text>
			</View>

			<Image
				src={endpoint + '/assets/footer-big.png'}
				style={{
					position: 'absolute',
					bottom: '0',
					left: '0',
					width: '100%'
				}}
			/>
		</Page>
	);
};

const Section: FC<PropsWithChildren<{ title?: string }>> = ({
	title,
	children
}) => {
	return (
		<View style={{ margin: '0 64px' }}>
			{title && (
				<Text
					style={{
						fontWeight: 600,
						fontSize: '11px',
						lineHeight: relativeLineHeight(11, 20),
						marginBottom: '8px'
					}}>
					{title}
				</Text>
			)}
			{children}
		</View>
	);
};

const Item: FC<{ name?: string; value?: string; children?: ReactNode }> = ({
	name,
	value,
	children
}) => {
	return (
		<View
			style={{
				display: 'flex',
				flexDirection: 'row',
				width: '100%',
				minHeight: '18px'
			}}>
			{name && (
				<View
					style={{
						width: '30%'
					}}>
					<Text
						style={{
							fontWeight: 400,
							fontSize: '9px',
							color: '#444444'
						}}>
						{name}
					</Text>
				</View>
			)}
			{value && (
				<View>
					<Text
						style={{
							fontWeight: 400,
							fontSize: '9px',
							color: '#444444'
						}}>
						{value}
					</Text>
				</View>
			)}
			{children}
		</View>
	);
};

const Divider = () => {
	return (
		<View
			style={{
				height: '1px',
				margin: '24px 64px',

				backgroundColor: '#70CDDD'
			}}
		/>
	);
};

// Create Document Component
export const Document = ({ invoice }: { invoice: TInvoiceSchema }) => {
	const { t } = useTranslation(invoice.invoice.language);

	return (
		<PDFDocument>
			<FrontPage
				title={`${t.titleFirst} ${t.number} ${invoice.invoice.number}`}
				subtitle={`${t.subtitle}`}
			/>

			<DetailPage
				title={`${t.subtitle} - ${t.invoice} ${t.number} ${invoice.invoice.number}`}>
				<Section>
					<Item
						name={t.date}
						value={invoice.invoice.date.toLocaleDateString('hr')}
					/>
					<Item name={t.user + ':'} value={invoice.client.name} />
					<Item name={t.address + ':'} value={invoice.client.buildingAddress} />
					<Item name={t.omm + ':'} value={invoice.client.omm} />
					<Item name={t.oib + ':'} value={invoice.client.oib.toString()} />
					{invoice.client.phone && (
						<Item name={t.phone + ':'} value={invoice.client.phone} />
					)}
					<Item name={t.email + ':'} value={invoice.client.email} />
				</Section>

				<Divider />

				<Section title={t.amountNetto}>
					<Item
						name={t.amountBrutto}
						value={formatCurrency(invoice.invoice.amount, 'EUR')}
					/>
					<Item
						name={`${t.amountTax} (${invoice.invoice.vat}%)`}
						value={formatCurrency(
							(invoice.invoice.amount * invoice.invoice.vat) / 100,
							'EUR'
						)}
					/>
					<Item name={t.amountTotal}>
						<Text
							style={{
								fontWeight: 600,
								fontSize: '9px',
								color: '#000000'
							}}>
							{formatCurrency(
								invoice.invoice.amount * (1 + invoice.invoice.vat / 100),
								'EUR'
							)}
						</Text>
					</Item>
					<Item
						name={' '}
						value={`${formatCurrency(
							invoice.invoice.amount *
								(1 + invoice.invoice.vat / 100) *
								exchangeEURHRK,
							'HRK'
						)} (1 EUR = ${exchangeEURHRK} HRK)`}
					/>
				</Section>

				<Divider />

				<Section title={t.detailsProduct}>
					<Item value={invoice.details.description} />
				</Section>

				<Divider />

				<Section title={t.detailsPayment}>
					<Item value={invoice.details.payment} />
				</Section>

				<Divider />

				<Section title={t.detailsDescription}>
					<Item value={invoice.details.details} />
				</Section>
			</DetailPage>
		</PDFDocument>
	);
};
