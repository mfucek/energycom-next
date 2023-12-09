import {
	ClipPath,
	Defs,
	G,
	Path,
	Rect,
	Stop,
	Svg
} from '@joshuajaco/react-pdf-renderer-bundled';

export const Logo1 = () => (
	<Svg width="595" height="139" viewBox="0 0 595 139">
		<G>
			<Path
				d="M595 0C496 123.183 183 125.969 0 125.969V139H595V0Z"
				fill="url(#paint0_linear_8_19)"
			/>
			<Path
				d="M342.911 113.189C397.415 104.82 452.547 90.7725 498.521 71.3002C540.306 53.6021 575.339 31.0831 595 3.56092V0C496 123.183 183 125.969 0 125.969V130.107C5.16194 130.107 10.4295 130.11 15.7948 130.114H15.7983C109.041 130.173 231.811 130.25 342.911 113.189Z"
				fill="white"
			/>
		</G>
		<Defs>
			<linearGradient
				id="paint0_linear_8_19"
				x1="-95"
				y1="69.4998"
				x2="755"
				y2="69.4998"
				gradientUnits="userSpaceOnUse">
				<Stop offset="1.34185e-07" stopColor="#70CDDD" />
				<Stop offset="1" stopColor="#2E4A9F" />
			</linearGradient>
			<ClipPath id="clip0_8_19">
				<Rect width="595" height="139" fill="white" />
			</ClipPath>
		</Defs>
	</Svg>
);
