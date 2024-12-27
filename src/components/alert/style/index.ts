import { CSSProperties } from 'react';
import { genStyleHooks } from '../../theme/internal';
import { FullToken } from '@/components/theme/interface/cssinjs-utils';
import { resetComponent } from '@/components/style';

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
	const {
		componentCls,
		defaultPadding,
		fontSize,
		lineHeight,
		colorTextHeading,
		marginXS,
		borderRadius,
		motionEaseInOutCirc,
		motionDurationSlow: duration,
	} = token;
	// const duration = '100s';

	return {
		[componentCls]: {
			...resetComponent(token),
			display: 'flex',
			alignItems: 'center',
			padding: defaultPadding,
			borderRadius,

			[`&-content`]: {
				flex: 1,
			},

			[`&-description`]: {
				fontSize,
				lineHeight,
			},

			'&-icon': {
				marginRight: marginXS,
			},

			'&-message': {
				marginBottom: marginXS,
				color: colorTextHeading,
			},

			[`&${componentCls}-motion-leave`]: {
				overflow: 'hidden',
				opacity: 1,
				transition: `max-height ${duration} ${motionEaseInOutCirc}, opacity ${duration} ${motionEaseInOutCirc},
        padding-top ${duration} ${motionEaseInOutCirc}, padding-bottom ${duration} ${motionEaseInOutCirc},
        margin-bottom ${duration} ${motionEaseInOutCirc}`,
			},

			[`&${componentCls}-motion-leave-active`]: {
				maxHeight: 0,
				marginBottom: '0 !important',
				paddingTop: 0,
				paddingBottom: 0,
				opacity: 0,
			},
		},
	};
};

export const genActionStyle = (token: any) => {
	const { componentCls, fontSizeIcon } = token;
	return {
		[componentCls]: {
			'&-close-icon': {
				background: 'transparent',
				border: 'none',
				outline: 'none',
				cursor: 'pointer',
				fontSize: fontSizeIcon,
				lineHeight: `${fontSizeIcon}px`,
				backgroundColor: 'transparent',
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
		colorError,
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
