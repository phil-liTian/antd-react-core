import { AliasToken } from '../interface/alias';
import getAlphaColor from './getAlphaColor';

export default function formatToken(derivativeToken): AliasToken {
	const mergedToken = {
		...derivativeToken,
	};

	let aliasToken: AliasToken = {
		...mergedToken,
		// background
		colorFillContent: mergedToken.colorFillSecondary,

		// text
		colorTextDescription: mergedToken.colorTextTertiary,

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

		colorIcon: mergedToken.colorTextTertiary,

		// checkbox & expand size
		controlInteractiveSize: mergedToken.controlHeight / 2,

		colorSplit: getAlphaColor(
			mergedToken.colorBorderSecondary,
			mergedToken.colorBgContainer
		),

		boxShadow: `
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,

		boxShadowSecondary: `
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,

		boxShadowTertiary: `
      0 1px 2px 0 rgba(0, 0, 0, 0.03),
      0 1px 6px -1px rgba(0, 0, 0, 0.02),
      0 2px 4px 0 rgba(0, 0, 0, 0.02)
    `,
	};

	return aliasToken;
}
