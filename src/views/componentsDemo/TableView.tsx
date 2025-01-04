import React from 'react'
import Basic from './tableView/basic'
import { Segmented } from 'antd'
import Bordered from './tableView/bordered'
import Pagintion from './tableView/pagination'
import Empty from './tableView/empty'
import Summary from './tableView/summary'
import RowSelection from './tableView/row-selection'
import RowSelectionDebug from './tableView/row-selection-debug'
import FilterSearch from './tableView/filter-search'
import FilterInTree from './tableView/filter-in-tree'
import Ellipsis from './tableView/ellipsis'
import FixedColumns from './tableView/fixed-columns'
import Expand from './tableView/expand'
import Virtual from './tableView/virtual'
import GroupingColumns from './tableView/grouping-columns'


const options = [
  { label: '基础', value: 'Basic' },
  { label: '分页器', value: 'Pagination' },
  { label: 'Bordered', value: 'Bordered' },
  { label: 'empty', value: 'Empty' },
  { label: 'rowSelection', value: 'RowSelection' },
  { label: 'rowSelectionDebug', value: 'RowSelectionDebug' },
  { label: 'ellipsis', value: 'Ellipsis' },
  { label: 'Summary', value: 'Summary' },
  { label: 'FilterSearch', value: 'FilterSearch' },
  { label: 'FilterInTree', value: 'FilterInTree' },
  { label: 'fixed', value: 'FixedColumns' },
  { label: 'Expand', value: 'Expand' },
  { label: '虚拟列表', value: 'Virtual' },
  { label: '表头分组', value: 'GroupingColumns' }
]

const TableView: React.FC = () => {
  const [curSegmented, setCurSegmented] = React.useState('Virtual')
  const curComponent = {
    Basic: <Basic />,
    Pagination: < Pagintion />,
    Bordered: <Bordered />,
    Empty: <Empty />,
    Ellipsis: <Ellipsis />,
    RowSelection: <RowSelection />,
    Summary: <Summary />,
    RowSelectionDebug: <RowSelectionDebug />,
    FilterSearch: <FilterSearch />,
    FilterInTree: <FilterInTree />,
    FixedColumns: <FixedColumns />,
    Expand: <Expand />,
    Virtual: <Virtual />,
    GroupingColumns: <GroupingColumns />
  }

  return <>
    <Segmented value={curSegmented} options={options.slice(0, 10)} onChange={setCurSegmented} />
    <br />
    <Segmented value={curSegmented} options={options.slice(10)} onChange={setCurSegmented} />
    <br />
    {curComponent[curSegmented]}
  </>
}

// todos: summary、fixed、filter
// TODO: filter、sorter、expand、virtual
// 表头分组，表格行列合并、拖拽排序、拖拽手柄列、嵌套子表格


export default TableView