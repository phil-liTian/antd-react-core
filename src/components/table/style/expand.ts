import { operationUnit } from '../../style/index';
export const genExpandStyle = (token) => {
	const {
		componentCls,
		expandIconSize,
		lineWidth,
		lineType,
		tableBorderColor,
		borderRadius,
		expandIconHalfInner,
		paddingXXS,
		motionDurationSlow,
		calc,
	} = token;
	const tableBorder = `${lineWidth}px ${lineType} ${tableBorderColor}`;
	const expandIconLineOffset = calc(paddingXXS).sub(lineWidth).equal();
	return {
		[`${componentCls}-wrapper`]: {
			[`${componentCls}-row-expand-icon-cell`]: {
				[`${componentCls}-row-expand-icon`]: {
					...operationUnit(token),
					position: 'relative',
					display: 'inline-block',
					width: expandIconSize,
					height: expandIconSize,
					lineHeight: `${expandIconSize}px`,
					border: tableBorder,
					borderRadius,
					color: 'inherit',
					padding: 0,
					verticalAlign: 'sub',
					boxSizing: 'border-box',

					'&:focus, &:hover': {
						borderColor: 'currentcolor',
					},

					'&:active': {
						borderColor: 'currentcolor',
					},

					'&::before, &::after': {
						position: 'absolute',
						content: '""',
						background: 'currentcolor',
						transition: `transform ${motionDurationSlow} ease-out`,
					},

					'&::before': {
						top: expandIconHalfInner,
						insetInlineStart: expandIconLineOffset,
						insetInlineEnd: expandIconLineOffset,
						height: lineWidth,
					},

					'&::after': {
						insetInlineStart: expandIconHalfInner,
						top: expandIconLineOffset,
						bottom: expandIconLineOffset,
						width: lineWidth,
						transform: 'rotate(90deg)',
					},
				},

				[`${componentCls}-row-collapsed`]: {
					'&::after': {
						transform: 'rotate(0deg)',
					},

					'&::before': {
						transform: 'rotate(-180deg)',
					},
				},

				[`${componentCls}-row-spaced`]: {
					background: 'transparent',
					border: 0,
					'&::before,&::after': {
						display: 'none',
						content: 'none',
					},
				},
			},
		},
	};
};
