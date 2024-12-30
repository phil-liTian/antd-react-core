import React from 'react';
import { AnyObject } from '../_util/type';
import { PaginationProps } from '../pagination';
import { TooltipProps } from '../tooltip';
import { DropdownProps } from '../dropdown/dropdown';

type Key = React.Key;

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
}
