import {
	Defs,
	LinearGradient,
	Rect,
	Stop,
	Svg
} from '@joshuajaco/react-pdf-renderer-bundled';

export const GradientBackground = () => (
	<Svg width="595" height="842" viewBox="0 0 595 842">
		<Rect width="595" height="842" fill="url(#paint0_linear_10_52)" />
		<Defs>
			<LinearGradient id="paint0_linear_10_52" x1="0" y1="0" x2="1" y2="0">
				<Stop offset="0%" stopColor="#70CDDD" />
				<Stop offset="100%" stopColor="#2E4A9F" />
			</LinearGradient>
		</Defs>
	</Svg>
);
