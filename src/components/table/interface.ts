import React from 'react';
import { GetRowKey } from 'rc-table/lib/interface';
import { AnyObject } from '../_util/type';
import { PaginationProps } from '../pagination';
import { TooltipProps } from '../tooltip';
import { DropdownProps } from '../dropdown/dropdown';

export type RefTable = <RecordType = AnyObject>(props) => React.ReactElement;

export type Key = React.Key;

export type SortOrder = 'descend' | 'ascend' | null;
export type SorterTooltipProps = TooltipProps;
export type FilterValue = (Key | boolean)[];
export type CompareFn<T = AnyObject> = (
	a: T,
	b: T,
	sortOrder?: SortOrder
) => number;

export type FilterSearchType<RecordType = AnyObject> =
	| boolean
	| ((input: string, record: RecordType) => boolean);

// filter
export interface ColumnFilterItem {
	text: React.ReactNode;
	value: Key | boolean;
	children?: ColumnFilterItem[];
}

export interface FilterDropdownProps {
	prefixCls: string;
}

interface CoverableDropdownProps extends DropdownProps {}

export type RowSelectionType = 'radio' | 'checkbox';

export interface ColumnTitleProps<RecordType = AnyObject> {
	sortOrder?: SortOrder;
	filters?: Record<string, FilterValue>;
}

export type ColumnTitle<RecordType = AnyObject> =
	| React.ReactNode
	| ((props: ColumnTitleProps<RecordType>) => React.ReactNode);

export interface ColumnType<RecordType = AnyObject> {
	title?: ColumnTitle<RecordType>;

	// ========================== sorter ==========================
	sorter?: boolean | CompareFn<RecordType>;
	sortOrder?: SortOrder;
	defaultSortOrder?: SortOrder; // 默认的排序方式
	sortDirections?: SortOrder[]; // 支持的排序方式
	sortIcon?: (props: { sortIcon: SortOrder }) => React.ReactNode;
	showSorterTooltip?: boolean | SorterTooltipProps;

	// ========================== filter ==========================
	filtered?: boolean;
	filters?: ColumnFilterItem[];
	filterDropdown?:
		| React.ReactNode
		| ((props: FilterDropdownProps) => React.ReactNode);
	filterOnClose?: boolean;
	filterMultiple?: boolean;
	filteredValue?: FilterValue | null;
	defaultFilteredValue?: FilterValue | null;
	filterMode?: 'menu' | 'tree';
	filterIcon?: React.ReactNode | ((filtered: boolean) => React.ReactNode);
	filterSearch?: FilterSearchType<ColumnFilterItem>;
	onFilter?: (value: Key | boolean, record: RecordType) => boolean;
	filterDropdownProps?: CoverableDropdownProps;
}

export type ColumnsType<RecordType = AnyObject> = ColumnType<RecordType>[];

type TablePaginationPosition =
	| 'topLeft'
	| 'topCenter'
	| 'topRight'
	| 'bottomLeft'
	| 'bottomCenter'
	| 'bottomRight'
	| 'none';

export interface TablePaginationConfig extends PaginationProps {
	position?: TablePaginationPosition[];
}

export interface TableLocale {
	emptyText?: React.ReactNode | (() => React.ReactNode);
	filterSearchPlaceholder?: string;
}

export type RowSelectMethod = 'all' | 'none' | 'invert' | 'single' | 'multiple';

export interface SelectionItem {
	key: string;
	text: React.ReactNode;
	onSelect: (changeSelectKeys: Key[]) => void;
}

export type SelectionSelectFn<T = AnyObject> = (
	record: T,
	selected: boolean,
	selectedRows: T[],
	nativeEvent: Event
) => void;

export interface TableRowSelection<T = AnyObject> {
	type?: RowSelectionType;
	selectedRowKeys?: Key[];
	defaultSelectedRowKeys?: Key[];
	columnTitle?: React.ReactNode | (() => React.ReactNode);
	hideSelectAll?: boolean;
	checkStrictly?: boolean; // 父子状态下节点选择是否完全受控
	columnWidth?: string | number;
	selections?: true | SelectionItem[];

	onSelect?: SelectionSelectFn<T>;
	onChange?: (
		selectedRowKeys: Key[],
		selectedRows: T[],
		info?: { type: RowSelectMethod }
	) => void;
}

export type TransformColumns<RecordType = AnyObject> = (
	columns: ColumnsType<RecordType>
) => ColumnsType<RecordType>;

export type { GetRowKey };
