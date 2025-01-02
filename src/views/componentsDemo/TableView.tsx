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
]

const TableView: React.FC = () => {
  const [curSegmented, setCurSegmented] = React.useState('Summary')
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
  }

  return <>
    <Segmented value={curSegmented} options={options} onChange={setCurSegmented} />
    <br />
    {curComponent[curSegmented]}
  </>
}

// todos: summary、fixed、filter


export default TableView