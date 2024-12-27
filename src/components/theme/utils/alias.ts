import { AliasToken } from '../interface/alias';

export default function formatToken(derivativeToken): AliasToken {
	const mergedToken = {
		...derivativeToken,
	};

	let aliasToken: AliasToken = {
		...mergedToken,
		paddingContentVerticalSM: 4,
		colorTextLightSolid: mergedToken.colorWhite,

		paddingContentHorizontal: mergedToken.sizeMS,

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
	};

	return aliasToken;
}
