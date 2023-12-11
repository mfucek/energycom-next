'use client';
import { TInvoiceSchema } from '@/modules/bill/schemas/invoice-schema';
import { usePathname, useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { FC, PropsWithChildren } from 'react';

if (typeof window !== 'undefined') {
	posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
		api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
		capture_pageview: false // Disable automatic pageview capture, as we capture manually
	});
}

export const useCaptureEvent = () => {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	if (process.env.NODE_ENV === 'development' || typeof window === 'undefined') {
		return {
			capture: () => {
				console.log('capture');
			},
			captureInvoice: () => {
				console.log('captureInvoice');
			},
			captureTranslation: () => {
				console.log('captureTranslation');
			}
		};
	}

	const capture = (name: string, properties: Record<string, any>) => {
		if (window && pathname) {
			let url = window.origin + pathname;
			if (searchParams && searchParams.toString()) {
				url = url + `?${searchParams.toString()}`;
			}
			posthog.capture(name, { url, ...properties });
		}
	};

	const captureTranslation = (invoice: TInvoiceSchema) => {
		const {
			details: { description, details, payment },
			invoice: { language }
		} = invoice;
		const descriptionLength = (description + details + payment).length;

		capture('invoice_translation', {
			language: language,
			description_length: descriptionLength
		});
	};

	const captureInvoice = (invoice: TInvoiceSchema) => {
		const {
			client: { name },
			invoice: { amount, vat, language, number }
		} = invoice;

		capture('invoice_render', {
			name,
			amount,
			vat,
			language,
			invoice_number: number
		});
	};

	return { capture, captureInvoice, captureTranslation };
};

export const PHProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
	if (process.env.NODE_ENV === 'development') {
		return <>{children}</>;
	}

	return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
};
