import { AnyObject } from '../_util/type';
import { ColumnTitle, ColumnTitleProps, ColumnType } from './interface';

export function renderColumnTitle<RecordType extends AnyObject>(
	title: ColumnTitle<RecordType>,
	props: ColumnTitleProps<RecordType>
) {
	if (typeof title === 'function') {
		return title(props);
	}
	return title;
}

export function getColumnPos(index: number, pos?: string) {
	return pos ? `${pos}-${index}` : `${index}`;
}

export function getColumnKey<RecordType extends AnyObject = AnyObject>(
	column: ColumnType<RecordType>,
	defaultKey: string
) {
	if ('key' in column && column.key !== undefined && column.key !== null) {
		return column.key;
	}

	return defaultKey;
}
