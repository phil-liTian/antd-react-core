export const genVirtualStyle = (token) => {
	const { componentCls, lineWidth, lineType, tableBorderColor } = token;
	const tableBorder = `${lineWidth}px ${lineType} ${tableBorderColor}`;
	return {
		[`${componentCls}-wrapper`]: {
			[`${componentCls}-tbody-virtual`]: {
				['&-holder-inner']: {
					[`${componentCls}-row`]: {
						display: 'flex',
						width: '100%',
					},
				},
			},

			[`${componentCls}-bordered`]: {
				[`${componentCls}-tbody-virtual`]: {
					[`${componentCls}-cell`]: {
						borderInlineEnd: tableBorder,
					},
				},
			},

			[`${componentCls}-virtual`]: {
				[`${componentCls}-cell`]: {
					borderBottom: tableBorder,
				},
			},
		},
	};
};
