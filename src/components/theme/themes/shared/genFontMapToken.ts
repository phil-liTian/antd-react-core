import getFontSizes from './genFontSizes';

export default function genFontMapToken(fontSize: number) {
	const fontSizePairs = getFontSizes(fontSize);
	console.log('fontSizePairs', fontSizePairs);
	const fontSizes = fontSizePairs.map((v) => v.size);
	const lineHeights = fontSizePairs.map((v) => v.lineHeight);

	const fontSizeMD = fontSizes[1];
	const fontSizeSM = fontSizes[0];
	const fontSizeLG = fontSizes[2];
	const lineHeight = lineHeights[1];
	const lineHeightSM = lineHeights[0];
	const lineHeightLG = lineHeights[2];

	return {
		fontSizeSM,
		fontSize: fontSizeMD,
	};
}
