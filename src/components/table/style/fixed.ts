

export const genFixedStyle = token => {
  const {
		componentCls,
		zIndexTableFixed,
		tableBg,
		colorSplit,
		motionDurationSlow,
	} = token;
  const shadowColor = colorSplit;
  
  return {
		[`${componentCls}-wrapper`]: {
			[`${componentCls}-cell-fix-left,
				${componentCls}-cell-fix-right
				`]: {
				position: 'sticky !important',
				zIndex: zIndexTableFixed,
				background: tableBg,
			},

			// left
			[`${componentCls}-cell-fix-left-first::after,
        ${componentCls}-cell-fix-left-last::after`]: {
				position: 'absolute',
				top: 0,
				right: 0,
				bottom: 0,
				content: '""',
				width: 30,
				transform: 'translateX(100%)',
				transition: `box-shadow ${motionDurationSlow}`,
			},

			// right
			[`${componentCls}-cell-fix-right-first::after,
        ${componentCls}-cell-fix-right-last::after`]: {
				position: 'absolute',
				top: 0,
				left: 0,
				bottom: 0,
				content: '""',
				width: 30,
				transform: 'translateX(-100%)',
				transition: `box-shadow ${motionDurationSlow}`,
			},

			[`${componentCls}-ping-left`]: {
				[`${componentCls}-cell-fix-left-first::after, ${componentCls}-cell-fix-left-last::after`]:
					{
						boxShadow: `inset 10px 0 8px -8px ${shadowColor}`,
					},
				// [`${componentCls}-cell-fix-left-first::before, ${componentCls}-cell-fix-left-last::before`]: {

				// }
			},
			[`${componentCls}-ping-right`]: {
				// [`&:not(${componentCls}-has-fix-right) ${componentCls}-container::after`]:
				// 	{
				// 		boxShadow: `inset -10px 0 8px -8px ${shadowColor}`,
				// 	},
				[`${componentCls}-cell-fix-right-first::after, ${componentCls}-cell-fix-right-last::after`]:
					{
						boxShadow: `inset -10px 0 8px -8px ${shadowColor}`,
					},
			},
		},
	};
}