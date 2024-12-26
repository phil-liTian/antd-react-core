import { genStyleHooks } from '@/components/theme/internal';
import { CSSObject } from '@ant-design/cssinjs';
import { prepareComponentToken } from './token';

const genSolidButtonStyle = (token, textColor, background: string) => {
	[];
};

const genSharedButtonStyle = (token: any): CSSObject => {
	const { componentCls } = token;

	return {
		[componentCls]: {
			outline: 'none',
			userSelect: 'none',
			cursor: 'pointer',
			background: 'transparent',
			backgroundImage: 'none',
			border: 'transparent',
		},
	};
};

const genDefaultButtonStyle = (token) => ({
	// color: token.defaultColor,
});

const genColorButtonStyle = (token) => {
	const { componentCls } = token;
	return {
		[`${componentCls}-color-default`]: genDefaultButtonStyle(token),
	};
};

export default genStyleHooks(
	'Button',
	(token) => {
		return [
			genSharedButtonStyle(token),
			// color
			genColorButtonStyle(token),
		];
	},
	prepareComponentToken
);
