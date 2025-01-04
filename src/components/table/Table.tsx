import type { Reference } from 'rc-table'
import { Summary } from 'rc-table'
import { TableProps } from "./InternalTable";
import InternalTable from './InternalTable';
import React from 'react';
import { AnyObject } from '../_util/type';
import { SELECTION_COLUMN, SELECTION_ALL, SELECTION_INVERT, SELECTION_NONE } from './hooks/useSelection';
import { RefTable } from './interface';

// spin、pagination

const Table = <RecordType extends AnyObject = AnyObject>(
  props: TableProps<RecordType>,
  ref: React.Ref<Reference>) => {
  return <InternalTable<RecordType> {...props} ref={ref} />
}

const ForwardTable = React.forwardRef(Table) as unknown as RefTable & {
  SELETION_COLUMN: typeof SELECTION_COLUMN,
  SELECTION_INVERT: typeof SELECTION_INVERT,
  SELECTION_ALL: typeof SELECTION_ALL,
  SELECTION_NONE: typeof SELECTION_NONE,
  Summary: typeof Summary
}

ForwardTable.SELETION_COLUMN = SELECTION_COLUMN;
ForwardTable.Summary = Summary;

export default ForwardTable as any
