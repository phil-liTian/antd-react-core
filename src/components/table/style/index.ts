import { genStyleHooks, mergeToken } from '@/components/theme/internal';
import { CSSInterpolation } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import { genPaginationStyle } from './pagination';
import { genBorderedStyle } from './bordered';
import { genEllipsisStyle } from './ellipsis';
import { genSelectionStyle } from './selection';

export interface ComponentToken {
	headerBg: string;
	headerSplitColor: string;
	cellFontSize: number;
	borderColor: string;
	footerBg: string;
	footerColor: string;
	headerIconColor: string;
}

export interface TableToken {
	tablePaddingVertical: number;
	tablePaddingHorizontal: number;
	tableHeaderBg: string;
	tableHeaderCellSplitColor: string;
	tableFontSize: number;
	tableBorderColor: string;
	tableFooterBg: string;
	tableFooterTextColor: string;
}

const genTableStyle = (token): CSSInterpolation => {
	const {
		componentCls,
		tablePaddingHorizontal,
		tablePaddingVertical,
		tableHeaderBg,
		tableHeaderCellSplitColor,
		cellFontSize,
		lineWidth,
		lineType,
		tableBorderColor,
		tableFooterBg,
	} = token;
	const tableBorder = `${lineWidth}px ${lineType} ${tableBorderColor}`;
	return {
		[`${componentCls}-wrapper`]: {
			maxWidth: '100%',
			[componentCls]: {
				fontSize: cellFontSize,
			},
			table: {
				width: '100%',
				borderSpacing: 0,
			},

			[`${componentCls}-cell,
        ${componentCls}-thead > tr > th,
        ${componentCls}-tbody > tr > th,
      `]: {
				padding: `${tablePaddingHorizontal}px ${tablePaddingVertical}px`,
				textAlign: 'start',
			},

			[`${componentCls}-thead`]: {
				['> tr > th']: {
					position: 'relative',
					background: tableHeaderBg,

					[`&:not(:last-child):not(${componentCls}-selection-column)::before`]:
						{
							position: 'absolute',
							content: '""',
							width: 1,
							top: '50%',
							insetInlineEnd: 0,
							transform: 'translateY(-50%)',
							background: tableHeaderCellSplitColor,
							height: '1.6em',
						},
				},
			},

			[`${componentCls}-tbody`]: {
				'> tr': {
					'> th, > td': {
						borderBottom: tableBorder,
					},
				},
			},

			// title
			[`${componentCls}-title`]: {
				padding: `${tablePaddingVertical}px ${tablePaddingHorizontal}px`,
			},

			// footer
			[`${componentCls}-footer`]: {
				padding: `${tablePaddingVertical}px ${tablePaddingHorizontal}px`,
				background: tableFooterBg,
			},
		},
	};
};

function prepareComponentToken(token) {
	const {
		padding,
		colorBgContainer,
		colorFillAlter,
		colorBorderSecondary,
		fontSize,
		colorTextHeading,
		colorIcon,
		opacityLoading = 1,
	} = token;

	const colorFillAlterSolid = new TinyColor(colorFillAlter)
		.onBackground(colorBgContainer)
		.toHexShortString();

	const baseColorAction = new TinyColor(colorIcon);

	return {
		cellPaddingBlock: padding,
		cellPaddingInline: padding,
		headerBg: colorFillAlterSolid,
		headerSplitColor: colorBorderSecondary,
		cellFontSize: fontSize,
		borderColor: colorBorderSecondary,
		footerBg: colorFillAlterSolid,
		footerColor: colorTextHeading,
		headerIconColor: baseColorAction
			.clone()
			.setAlpha(baseColorAction.getAlpha() * opacityLoading)
			.toRgbString(),
	};
}

export default genStyleHooks(
	'Table',
	(token) => {
		const {
			cellPaddingBlock,
			cellPaddingInline,
			headerBg,
			headerSplitColor,
			borderColor,
			footerBg,
			footerColor,
		} = token;

		const tableToken = mergeToken<TableToken>(token, {
			tablePaddingHorizontal: cellPaddingInline,
			tablePaddingVertical: cellPaddingBlock,
			tableHeaderBg: headerBg,
			tableHeaderCellSplitColor: headerSplitColor,
			tableBorderColor: borderColor,
			tableFooterBg: footerBg,
			tableFooterTextColor: footerColor,
		});

		return [
			// table
			genTableStyle(tableToken),

			// pagination
			genPaginationStyle(tableToken),

			// bordered
			genBorderedStyle(tableToken),

			// ellipsis
			genEllipsisStyle(tableToken),

			//selection
			genSelectionStyle(tableToken),
		];
	},
	prepareComponentToken
);
