import { AliasToken } from '../interface/alias';

export default function formatToken(derivativeToken): AliasToken {
	const mergedToken = {
		...derivativeToken,
	};

	let aliasToken: AliasToken = {
		...mergedToken,
		paddingContentVerticalSM: 4,
		colorTextLightSolid: mergedToken.colorWhite,

		// padding
		paddingContentHorizontalLG: mergedToken.sizeLG,
		paddingContentVerticalLG: mergedToken.sizeMS,
		paddingContentHorizontal: mergedToken.sizeMS,
		paddingContentVertical: mergedToken.sizeSM,
		paddingContentHorizontalSM: mergedToken.size,

		fontSizeIcon: mergedToken.fontSizeSM,
		colorTextHeading: mergedToken.colorText,

		marginXXS: mergedToken.sizeXXS,
		marginXS: mergedToken.sizeXS,
		marginSM: mergedToken.sizeSM,
		margin: mergedToken.size,
		marginMD: mergedToken.sizeMD,
		marginLG: mergedToken.sizeLG,
		marginXL: mergedToken.sizeXL,
		marginXXL: mergedToken.sizeXXL,

		// padding
		padding: mergedToken.size,
		paddingMD: mergedToken.sizeMD,
		paddingLG: mergedToken.sizeLG,
		paddingXL: mergedToken.sizeXL,
		paddingXXS: mergedToken.sizeXXS,
		paddingXS: mergedToken.sizeXS,
		paddingSM: mergedToken.sizeSM,

		colorFillAlter: mergedToken.colorFillQuaternary,

		opacityLoading: 0.65,
	};

	return aliasToken;
}
