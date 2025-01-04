import { AnyObject } from '@/components/_util/type';
import { genVirtualTable } from 'rc-table'
import { InternalTableProps } from '../InternalTable';

const RcVirtualTable = genVirtualTable(
  //   (prev, next) => {
  //   console.log('prev', next, prev);
  //   const { _renderTimes: prevRenderTimes } = prev as Readonly<InternalTableProps<AnyObject>>;
  //   const { _renderTimes: nextRenderTime } = next as Readonly<InternalTableProps<AnyObject>>;
  //   return prevRenderTimes !== nextRenderTime

  // }
)

export default RcVirtualTable