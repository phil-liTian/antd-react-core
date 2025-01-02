export const genSelectionStyle = (token): any => {
	const {
		componentCls,
		iconCls,
		headerIconColor,
		fontSizeIcon,
		calc,
		tablePaddingHorizontal,
	} = token;
	console.log(
		'iconCls',
		iconCls,
		fontSizeIcon,
		calc(tablePaddingHorizontal).div(4).equal()
	);

	return {
		[`${componentCls}-wrapper`]: {
			[`${componentCls}-selection-col`]: {},

			[`
        table tr th${componentCls}-selection-column,
        table tr td${componentCls}-selection-column,
      `]: {
				// paddingInlineEnd: token.paddingXS,
				// paddingInlineStart: token.paddingXS,
				// textAlign: 'center',
			},

			[`${componentCls}-selection`]: {
				display: 'inline-flex',
				position: 'relative',
				flexDirection: 'column',

				[`&-column::after`]: {
					backgroundColor: 'transparent !important',
				},
			},

			[`${componentCls}-selection-extra`]: {
				position: 'absolute',
				top: 0,
				marginInlineStart: '100%',
				paddingInlineStart: calc(tablePaddingHorizontal).div(4).equal() + 'px',

				[iconCls]: {
					color: headerIconColor,
					fontSize: fontSizeIcon,
					verticalAlign: 'baseline',
				},
			},
		},
	};
};
