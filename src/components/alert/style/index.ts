import { CSSProperties } from 'react';
import { genStyleHooks } from '../../theme/internal';
import { FullToken } from '@/components/theme/interface/cssinjs-utils';

export interface ComponentToken {
	defaultPadding: CSSProperties['padding'];
}

type AlertToken = FullToken<'Alert'>;

const genAlertTypeStyle = (
	bgColor: string,
	borderColor: string,
	iconColor: string,
	token: AlertToken,
	alertCls: string
) => {
	return {
		backgroundColor: bgColor,
		border: `${token.lineWidth}px ${token.lineType} ${borderColor}`,

		[`${alertCls}-icon`]: {
			color: iconColor,
		},
	};
};

export const genBaseStyle = (token: any) => {
	const { componentCls, defaultPadding, fontSize, lineHeight } = token;

	return {
		[componentCls]: {
			display: 'flex',
			alignItems: 'center',
			padding: defaultPadding,

			[`&-content`]: {
				flex: 1,
			},

			[`&-description`]: {
				fontSize,
				lineHeight,
			},

			'&-icon': {
				marginRight: '4px',
			},

			'&-message': {},
		},
	};
};

export const genActionStyle = (token: any) => {
	const { componentCls } = token;
	return {
		[componentCls]: {
			'&-close-icon': {
				background: 'transparent',
				border: 'none',
				outline: 'none',
				cursor: 'pointer',
			},
		},
	};
};

const prepareComponentToken = (token) => {
	const paddingHorizontal = 12;
	return {
		defaultPadding: `${token.paddingContentVerticalSM}px ${paddingHorizontal}px`,
	};
};

const genTypeStyle = (token) => {
	const {
		componentCls,
		colorSuccess,
		colorSuccessBorder,
		colorSuccessBg,
		colorInfoBg,
		colorInfo,
		colorInfoBorder,
		colorWarning,
		colorWarningBg,
		colorWarningBorder,

		colorErrorBg,
		colorErrorBorder,
		colorError
	} = token;
	return {
		[componentCls]: {
			'&-success': genAlertTypeStyle(
				colorSuccessBg,
				colorSuccessBorder,
				colorSuccess,
				token,
				componentCls
			),

			'&-info': genAlertTypeStyle(
				colorInfoBg,
				colorInfoBorder,
				colorInfo,
				token,
				componentCls
			),

			'&-warning': genAlertTypeStyle(
				colorWarningBg,
				colorWarningBorder,
				colorWarning,
				token,
				componentCls
			),

			'&-error': genAlertTypeStyle(
				colorErrorBg,
				colorErrorBorder,
				colorError,
				token,
				componentCls
			),
		},
	};
};

export default genStyleHooks(
	'Alert',
	(token) => {
		return [genBaseStyle(token), genTypeStyle(token), genActionStyle(token)];
	},
	prepareComponentToken
);
