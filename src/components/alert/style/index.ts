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
	const { componentCls, defaultPadding } = token;
	console.log('token', token);

	return {
		[componentCls]: {
			display: 'flex',
			alignItems: 'center',
			padding: defaultPadding,

			'&-icon': {
				marginRight: '4px',
			},

			'&-message': {},
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
		},
	};
};

export default genStyleHooks(
	'Alert',
	(token) => {
		console.log('token', token);

		return [genBaseStyle(token), genTypeStyle(token)];
	},
	prepareComponentToken
);
