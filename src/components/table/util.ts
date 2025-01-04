import { AnyObject } from "../_util/type";
import { ColumnTitle, ColumnTitleProps } from "./interface";


export function renderColumnTitle<RecordType extends AnyObject>(title: ColumnTitle<RecordType>, props: ColumnTitleProps<RecordType>) {
  if (typeof title === 'function') {
    return title(props);
  }
  return title;
}