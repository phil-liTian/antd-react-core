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
	const contentFontSize = token.fontSize
	console.log('contentFontSize', contentFontSize);
	
	const contentLineHeight = getLineHeight(contentFontSize)


	return {
		fontWeight: 400,
		defaultColor: token.colorText,
		primaryColor: token.colorTextLightSolid,
		contentFontSize,
		contentLineHeight,
		paddingBlock: Math.max(
			(token.controlHeight - contentFontSize * contentLineHeight) / 2 -
				token.lineWidth,
			0
		),

		paddingInline: token.paddingContentHorizontal - token.lineWidth,
	};
};
