export const genFilterStyle = (token) => {
	const {
		componentCls,
		antCls,
		paddingXXS,
		paddingXS,
		headerIconColor,
		fontSizeSM,
		borderRadius,
		tableHeaderFilterActiveBg,
		colorTextDescription,
		tableFilterDropdownWidth,
		tableFilterDropdownHeight,
		tableFilterDropdownSearchWidth,
		tableFilterDropdownBg,
		lineWidth,
		lineType,
		tableBorderColor,
		filterDropdownMenuBg,
		boxShadowSecondary,
	} = token;
	const tableBorder = `${lineWidth}px ${lineType} ${tableBorderColor}`;
	const orgAntCls = '.ant';

	const dropdownPrefixCls = `${orgAntCls}-dropdown`;
	const tableFilterDropdownPrefixCls = `${componentCls}-filter-dropdown`;
	return {
		[`${componentCls}-wrapper`]: {
			[dropdownPrefixCls]: {},

			[`${componentCls}-filter-column`]: {
				display: 'flex',
				justifyContent: 'space-between',
			},

			[`${componentCls}-filter-trigger`]: {
				padding: `0 ${paddingXXS}px`,
				color: headerIconColor,
				fontSize: fontSizeSM,
				borderRadius,
				cursor: 'pointer',

				'&:hover': {
					background: tableHeaderFilterActiveBg,
					color: colorTextDescription,
				},
			},
		},
		[`${orgAntCls}-dropdown`]: {
			[`${dropdownPrefixCls}-menu`]: {
				borderRadius: 'unset',
				border: 0,
				backgroundColor: filterDropdownMenuBg,
				boxShadow: 'none',
			},

			[tableFilterDropdownPrefixCls]: {
				minWidth: tableFilterDropdownWidth,
				backgroundColor: tableFilterDropdownBg,
				boxShadow: boxShadowSecondary,

				['&-search']: {
					padding: paddingXS,
					borderBottom: tableBorder,
				},

				['&-btns']: {
					display: 'flex',
					justifyContent: 'space-between',
					padding: paddingXS,
					borderTop: tableBorder,
				},

				[`&-tree`]: {
					paddingInline: paddingXS,
				},

				[`${orgAntCls}-checkbox-wrapper + span`]: {
					paddingInlineStart: paddingXS,
				},
			},
		},
	};
};
