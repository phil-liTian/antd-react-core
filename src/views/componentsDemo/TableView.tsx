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


const options = [
  { label: '基础', value: 'Basic' },
  { label: '分页器', value: 'Pagination' },
  { label: 'Bordered', value: 'Bordered' },
  { label: 'empty', value: 'Empty' },
  { label: 'Summary', value: 'Summary' },
  { label: 'rowSelection', value: 'RowSelection' },
  { label: 'rowSelectionDebug', value: 'RowSelectionDebug' },
  { label: 'filterSearch', value: 'FilterSearch' },
  { label: 'filterInTree', value: 'FilterInTree' },
  { label: 'ellipsis', value: 'Ellipsis' },
]

const TableView: React.FC = () => {
  const [curSegmented, setCurSegmented] = React.useState('Bordered')
  const curComponent = {
    Basic: <Basic />,
    Pagination: < Pagintion />,
    Bordered: <Bordered />,
    Empty: <Empty />,
    Summary: <Summary />,
    RowSelection: <RowSelection />,
    RowSelectionDebug: <RowSelectionDebug />,
    FilterSearch: <FilterSearch />,
    FilterInTree: <FilterInTree />,
    Ellipsis: <Ellipsis />
  }

  return <>
    <Segmented value={curSegmented} options={options} onChange={setCurSegmented} />
    <br />
    {curComponent[curSegmented]}
  </>

}


export default TableView