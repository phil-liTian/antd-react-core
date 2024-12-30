import { genStyleHooks, mergeToken } from '@/components/theme/internal';
import { CSSInterpolation } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import { genPaginationStyle } from './pagination';
import { genBorderedStyle } from './bordered';

export interface ComponentToken {
	headerBg: string;
	headerSplitColor: string;
	cellFontSize: number;
	borderColor: string;
}

export interface TableToken {
	tablePaddingVertical: number;
	tablePaddingHorizontal: number;
	tableHeaderBg: string;
	tableHeaderCellSplitColor: string;
	tableFontSize: number;
	tableBorderColor: string;
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

					['&:not(:last-child)::before']: {
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
	} = token;
	console.log('colorBgContainer', colorBgContainer);

	const colorFillAlterSolid = new TinyColor(colorFillAlter)
		.onBackground(colorBgContainer)
		.toHexShortString();

	return {
		cellPaddingBlock: padding,
		cellPaddingInline: padding,
		headerBg: colorFillAlterSolid,
		headerSplitColor: colorBorderSecondary,
		cellFontSize: fontSize,
		borderColor: colorBorderSecondary,
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
		} = token;

		const tableToken = mergeToken<TableToken>(token, {
			tablePaddingHorizontal: cellPaddingInline,
			tablePaddingVertical: cellPaddingBlock,
			tableHeaderBg: headerBg,
			tableHeaderCellSplitColor: headerSplitColor,
			tableBorderColor: borderColor,
		});

		return [
			// table
			genTableStyle(tableToken),

			// pagination
			genPaginationStyle(tableToken),

			// bordered
			genBorderedStyle(tableToken),
		];
	},
	prepareComponentToken
);
