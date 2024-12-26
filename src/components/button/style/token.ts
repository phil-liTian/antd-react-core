import { CSSProperties } from 'react';

export interface ComponentToken {
	fontWeight: CSSProperties['fontWeight'];
	defaultColor: string;
}

export const prepareComponentToken = (token) => {
	return {
		fontWeight: 400,
		defaultColor: token.colorText,
	};
};
