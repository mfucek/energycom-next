import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			},
			colors: {
				primary: {
					DEFAULT: 'var(--color-primary)',
					strong: 'var(--color-primary-strong)',
					medium: 'var(--color-primary-medium)',
					weak: 'var(--color-primary-weak)',
					contrast: 'var(--color-primary-contrast)'
				},
				neutral: {
					DEFAULT: 'var(--color-neutral)',
					strong: 'var(--color-neutral-strong)',
					medium: 'var(--color-neutral-medium)',
					weak: 'var(--color-neutral-weak)',
					contrast: 'var(--color-neutral-contrast)'
				},
				section: {
					DEFAULT: 'var(--color-section)',
					strong: 'var(--color-section-strong)'
				},
				background: 'var(--color-background)',
				success: {
					DEFAULT: 'var(--color-success)',
					strong: 'var(--color-success-strong)',
					medium: 'var(--color-success-medium)',
					weak: 'var(--color-success-weak)',
					contrast: 'var(--color-success-contrast)'
				},
				danger: {
					DEFAULT: 'var(--color-danger)',
					strong: 'var(--color-danger-strong)',
					medium: 'var(--color-danger-medium)',
					weak: 'var(--color-danger-weak)',
					contrast: 'var(--color-danger-contrast)'
				},
				warning: {
					DEFAULT: 'var(--color-warning)',
					strong: 'var(--color-warning-strong)',
					medium: 'var(--color-warning-medium)',
					weak: 'var(--color-warning-weak)'
				},
				info: {
					DEFAULT: 'var(--color-info)',
					strong: 'var(--color-info-strong)',
					medium: 'var(--color-info-medium)',
					weak: 'var(--color-info-weak)',
					contrast: 'var(--color-info-contrast)'
				},
				special: {
					black: 'var(--color-special-black)',
					white: 'var(--color-special-white)'
				}
			}
		},
		fontFamily: {
			nunito: ['Nunito', 'sans-serif'],
			open: ['Open', 'sans-serif']
		}
	},
	plugins: []
};
export default config;
