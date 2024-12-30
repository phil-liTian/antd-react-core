export const genBorderedStyle = (token) => {
	const { componentCls, lineWidth, lineType, tableBorderColor } = token;
	const tableBorder = `${lineWidth}px ${lineType} ${tableBorderColor}`;

	return {
		[`${componentCls}-wrapper`]: {
			[`${componentCls}-bordered`]: {
				[`${componentCls}-container`]: {
					borderTop: tableBorder,
					borderInlineStart: tableBorder,

					[`
            > ${componentCls}-content, 
            > ${componentCls}-footer`]: {
						'> table ': {
							[`> thead > tr > th,
                > tbody > tr > td,  
              `]: {
								borderInlineEnd: tableBorder,
							},

							'>thead': {
								'> tr > th::before': {
									backgroundColor: 'transparent !important',
								},
							},
						},
					},
				},
			},
		},
	};
};
