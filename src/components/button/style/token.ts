import { getLineHeight } from '@/components/theme/themes/shared/genFontSizes';
import { CSSProperties } from 'react';

export interface ComponentToken {
	fontWeight: CSSProperties['fontWeight'];
	defaultColor: string;
	primaryColor: string;
	contentFontSize: number;
	contentLineHeight: number;
}

export const prepareComponentToken = (token) => {
	const contentFontSize = token.fontSize;
	const contentFontSizeLG = token.fontSizeLG;

	const contentLineHeight = getLineHeight(contentFontSize);
	const contentLineHeightLG = getLineHeight(contentFontSizeLG);

	let paddingBlock = Math.max(
		(token.controlHeight - contentFontSize * contentLineHeight) / 2 -
			token.lineWidth,
		0
	);

	const paddingInline = token.paddingContentHorizontal - token.lineWidth;

	return {
		fontWeight: 400,
		defaultColor: token.colorText,
		primaryColor: token.colorTextLightSolid,
		contentFontSize,
		contentFontSizeLG,
		contentLineHeight,
		contentLineHeightLG,
		paddingBlock,

		buttonPaddingVertical: paddingBlock,
		buttonPaddingHorizontal: paddingInline,

		paddingInline: token.paddingContentHorizontal - token.lineWidth,
		paddingInlineLG: token.paddingContentHorizontal - token.lineWidth,

		paddingBlockLG: Math.max(
			(token.controlHeightLG - contentFontSizeLG * contentLineHeightLG) / 2 -
				token.lineWidth,
			0
		),
	};
};
