import { genStyleHooks, mergeToken } from '@/components/theme/internal';
import { CSSObject } from '@ant-design/cssinjs';
import { prepareComponentToken } from './token';
import genGroupStyle from './group';

// ====================== variant ==========================
const genSolidButtonStyle = (token, textColor, background: string) => ({
	[`${token.componentCls}-variant-solid`]: {
		color: textColor,
		background,
	},
});

// ====================== size ==========================

const genButtonStyle = (token, prefixCls = '') => {
	const {
		paddingInline,
		paddingBlock,
		borderRadius,
		controlHeight,
		lineHeight,
		fontSize,
		buttonPaddingVertical,
		buttonPaddingHorizontal,
	} = token;
	return {
		[prefixCls]: {
			fontSize,
			height: controlHeight,
			lineHeight,
			padding: `${buttonPaddingVertical}px ${buttonPaddingHorizontal}px`,
			borderRadius,
		},
	};
};

const genSizeBaseButtonStyle = (token) => {
	const baseToken = mergeToken(token, {
		lineHeight: token.contentLineHeight,
		fontSize: token.contentFontSize,
	});

	return genButtonStyle(baseToken, token.componentCls);
};

const genSizeLargeButtonStyle = (token) => {
	const largeToken = mergeToken(token, {
		lineHeight: token.contentLineHeightLG,
		fontSize: token.contentFontSizeLG,
		buttonPaddingHorizontal: token.paddingInlineLG,
		buttonPaddingVertical: token.paddingBlockLG,
	});

	return genButtonStyle(largeToken, `${token.componentCls}-lg`);
};

const genSharedButtonStyle = (token: any): CSSObject => {
	const { componentCls } = token;

	return {
		[componentCls]: {
			display: 'inline-flex',
			outline: 'none',
			userSelect: 'none',
			cursor: 'pointer',
			background: 'transparent',
			backgroundImage: 'none',
			border: 'transparent',
		},
	};
};

// ======================== type ==========================
const genDefaultButtonStyle = (token) => ({
	color: token.defaultColor,
});

const genPrimaryButtonStyle = (token) => ({
	color: token.colorPrimary,
});

const genColorButtonStyle = (token) => {
	const { componentCls } = token;
	return {
		[`${componentCls}-color-default`]: genDefaultButtonStyle(token),
		[`${componentCls}-color-primary`]: genPrimaryButtonStyle(token),
	};
};

const genCompatibleButtonStyle = (token) => ({
	...genSolidButtonStyle(token, token.primaryColor, token.colorPrimary),
});

export default genStyleHooks(
	'Button',
	(token) => {
		return [
			genSharedButtonStyle(token),
			// color
			genColorButtonStyle(token),

			// size
			genSizeBaseButtonStyle(token),
			genSizeLargeButtonStyle(token),

			// compatible
			genCompatibleButtonStyle(token),

			// group
			genGroupStyle(token),
		];
	},
	prepareComponentToken
);
