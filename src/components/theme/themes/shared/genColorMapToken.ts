import { SeedToken } from '../../interface';
import { ColorMapToken } from '../../interface/map/colors';

export const genColorMapToken = (
	seed: SeedToken,
	{ generateColorPalettes, generateNeutralColorPalettes }
): ColorMapToken => {
	const {
		colorSuccess: colorSuccessBase,
		colorWarning: colorWarningBase,
		colorError: colorErrorBase,
		colorInfo: colorInfoBase,
		colorPrimary: colorPrimaryBase,
		colorBgBase,
		colorTextBase,
	} = seed;

	const primaryColors = generateColorPalettes(colorPrimaryBase);
	const successColors = generateColorPalettes(colorSuccessBase);
	const warningColors = generateColorPalettes(colorWarningBase);
	const errorColors = generateColorPalettes(colorErrorBase);
	const infoColors = generateColorPalettes(colorInfoBase);

	const neutralColors = generateNeutralColorPalettes(
		colorBgBase,
		colorTextBase
	);

	const colorLink = seed.colorLink || seed.colorInfo;
	const linkColors = generateColorPalettes(colorLink);
	console.log('linkColors', linkColors);

	return {
		...neutralColors,

		// success
		colorSuccessBg: successColors[1],
		colorSuccessBgHover: successColors[2],
		colorSuccessBorder: successColors[3],
		colorSuccessBorderHover: successColors[4],
		colorSuccessHover: successColors[4],
		colorSuccess: successColors[6],
		colorSuccessActive: successColors[7],
		colorSuccessTextHover: successColors[8],
		colorSuccessText: successColors[9],
		colorSuccessTextActive: successColors[10],

		// primary
		colorPrimaryBg: primaryColors[1],
		colorPrimaryBgHover: primaryColors[2],
		colorPrimaryBorder: primaryColors[3],
		colorPrimaryBorderHover: primaryColors[4],
		colorPrimaryHover: primaryColors[5],
		colorPrimary: primaryColors[6],
		colorPrimaryActive: primaryColors[7],
		colorPrimaryTextHover: primaryColors[8],
		colorPrimaryText: primaryColors[9],
		colorPrimaryTextActive: primaryColors[10],

		// info
		colorInfoBg: infoColors[1],
		colorInfoBgHover: infoColors[2],
		colorInfoBorder: infoColors[3],
		colorInfoBorderHover: infoColors[4],
		colorInfoHover: infoColors[4],
		colorInfo: infoColors[6],
		colorInfoActive: infoColors[7],
		colorInfoTextHover: infoColors[8],
		colorInfoText: infoColors[9],
		colorInfoTextActive: infoColors[10],

		// error
		colorErrorBg: errorColors[1],
		colorErrorBgHover: errorColors[2],
		colorErrorBgActive: errorColors[3],
		colorErrorBorder: errorColors[3],
		colorErrorBorderHover: errorColors[4],
		colorErrorHover: errorColors[5],
		colorError: errorColors[6],
		colorErrorActive: errorColors[7],
		colorErrorTextHover: errorColors[8],
		colorErrorText: errorColors[9],
		colorErrorTextActive: errorColors[10],

		// warning
		colorWarningBg: warningColors[1],
		colorWarningBgHover: warningColors[2],
		colorWarningBorder: warningColors[3],
		colorWarningBorderHover: warningColors[4],
		colorWarningHover: warningColors[4],
		colorWarning: warningColors[6],
		colorWarningActive: warningColors[7],
		colorWarningTextHover: warningColors[8],
		colorWarningText: warningColors[9],
		colorWarningTextActive: warningColors[10],

		// link
		colorLinkHover: linkColors[4],
		colorLink: linkColors[6],
		colorLinkActive: linkColors[7],

		colorWhite: '#fff',
	};
};
