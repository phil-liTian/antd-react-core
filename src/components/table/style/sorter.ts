export const genSorterStyle = (token) => {
	const { componentCls, headerIconColor, fontSizeIcon, colorPrimary } = token;

	return {
		[`${componentCls}-wrapper`]: {
			[`${componentCls}-column-sorters`]: {
				display: 'flex',
				justifyContent: 'space-between',

				[`${componentCls}-column-sorter`]: {
					color: headerIconColor,
					fontSize: 0,
					'&-inner': {
						display: 'inline-flex',
						flexDirection: 'column',
						alignItems: 'center',
					},

					'&-up, &-down': {
						fontSize: fontSizeIcon,
						'&.active': {
							color: colorPrimary,
						},
					},
				},
			},
		},
	};
};
