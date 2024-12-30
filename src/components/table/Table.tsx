import type { Reference } from 'rc-table'
import { TableProps } from "./InternalTable";
import InternalTable from './InternalTable';
import React from 'react';
import { AnyObject } from '../_util/type';

// spin、pagination

const Table = <RecordType extends AnyObject = AnyObject>(
  props: TableProps<RecordType>,
  ref: React.Ref<Reference>) => {
  return <InternalTable {...props} ref={ref} />
}

const ForwardTable = React.forwardRef(Table)

export default ForwardTable
