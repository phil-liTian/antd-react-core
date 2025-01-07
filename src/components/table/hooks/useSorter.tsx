import { AnyObject } from "@/components/_util/type";
import { Tooltip } from 'antd'
import { ColumnsType, ColumnType, Key, SorterTooltipProps, SortOrder, TableLocale } from "../interface";
import React from "react";
import { getColumnKey, getColumnPos, renderColumnTitle } from "../util";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { TooltipProps } from "@/components/tooltip";

const ASCEND = 'ascend'
const DESCEND = 'descend'


interface SorterConfig<RecordType extends AnyObject = AnyObject> {
  prefixCls: string,
  sortDirections: SortOrder[],
  tableLocale: TableLocale,
  mergedColumns: ColumnsType<RecordType>,
  showSorterTooltip?: boolean | SorterTooltipProps,
  // columns: ColumnsType<RecordType>,
}

const nextSortDirection = (sortDirections: SortOrder[], current: SortOrder | null): SortOrder => {
  if (!current) {
    return sortDirections[0];
  }

  return sortDirections[sortDirections.indexOf(current) + 1];
}

const getSortFunction = <RecordType extends AnyObject = AnyObject>(sorter: ColumnType<RecordType>['sorter']) => {
  if (typeof sorter === 'function') {
    return sorter
  } else if (sorter && typeof sorter === 'object' && 'compare' in sorter) {
    return sorter.compare
  }
  return false
}


export interface SortState<RecordType extends AnyObject = AnyObject> {
  column: ColumnType<RecordType>
  key: Key,
  sortOrder: SortOrder | null
  // multiplePriority: number | boolean
}

const collectionSortStates = <RecordType extends AnyObject>(columns: ColumnsType<RecordType>, init: boolean, pos?: string): SortState<RecordType>[] => {
  let sortState: SortState<RecordType>[] = []


  return sortState
}

// 获取排序后的数据
export const getSortData = <RecordType extends AnyObject = AnyObject>(data: readonly RecordType[], sortStates: SortState<RecordType>[]) => {
  const innerSorterStates = sortStates.slice()
  const cloneData = data.slice()

  const runningSorters = innerSorterStates.filter(
    ({ column: { sorter }, sortOrder }) => getSortFunction<RecordType>(sorter) && sortOrder,
  );

  if ( !runningSorters.length ) return cloneData

  return cloneData.sort((record1, record2) => {
    for (let i = 0; i < runningSorters.length; i += 1) {
      const sortState = runningSorters[i];
      const { column: { sorter }, sortOrder } = sortState
      const compareFn = getSortFunction<RecordType>(sorter);
      if ( compareFn && sortOrder ) {
        const compareResult = compareFn(record1, record2, sortOrder)

        if ( compareResult !== 0 ) {
          return sortOrder === ASCEND ? compareResult : -compareResult
        }
      }
    }

    return 0
  })
}

function injectSorter<RecordType extends AnyObject = AnyObject>(
  prefixCls: string,
  columns: ColumnsType<RecordType>,
  sorterStates: SortState<RecordType>[],
  triggerSorter: (sortState: SortState<RecordType>) => void,
  defaultSortDirections: SortOrder[],
  tableLocale: TableLocale, tableShowSorterTooltip?: boolean | SorterTooltipProps,
  pos?: string) {
  const finalColumns = columns.map((column, index) => {
    const columnPos = getColumnPos(index, pos)
    let newColumn: ColumnType<RecordType> = column;
    if (newColumn.sorter) {
      const sortDirections = newColumn.sortDirections || defaultSortDirections
      const showSorterTooltip = newColumn.showSorterTooltip === undefined ? tableShowSorterTooltip : newColumn.showSorterTooltip
      const columnKey = getColumnKey(newColumn, columnPos)
      const sorterState = sorterStates.find(({ key }) => columnKey === key)
      const sortOrder: SortOrder | null = sorterState ? sorterState.sortOrder : null
      const nextSortOrder = nextSortDirection(sortDirections, sortOrder)

      let sorter: React.ReactNode
      if (newColumn.sortIcon) {
        sorter = column.sortIcon?.({ sortIcon: 'ascend' })
      } else {
        const upNode: React.ReactNode = <CaretUpOutlined className={classNames(`${prefixCls}-column-sorter-up`, { active: sortOrder === 'ascend' })} />

        const downNode: React.ReactNode = <CaretDownOutlined className={classNames(`${prefixCls}-column-sorter-down`, { active: sortOrder === 'descend' })} />

        sorter = <span className={`${prefixCls}-column-sorter`}>
          <span className={`${prefixCls}-column-sorter-inner`}>
            {upNode}
            {downNode}
          </span>
        </span>
      }
      const { cancelSort, triggerAsc, triggerDesc } = tableLocale || {}
      let sortTip: string | undefined = cancelSort
      if (nextSortOrder === 'ascend') {
        sortTip = triggerAsc
      } else if (nextSortOrder === 'descend') {
        sortTip = triggerDesc
      }

      const tooltipProps: TooltipProps = typeof showSorterTooltip === 'object' ? { title: sortTip, ...showSorterTooltip } : { title: sortTip }

      const renderTitle = () => {
        const columnSortersClass = `${prefixCls}-column-sorters`;
        const renderColumnTitleWrapper = <span className={`${prefixCls}-column-title`}>
          {renderColumnTitle(column.title, {})}
        </span>
        const renderSortTitle = <div className={columnSortersClass}>
          {renderColumnTitleWrapper}
          {sorter}
        </div>

        if (showSorterTooltip) {
          return <Tooltip {...tooltipProps}> {renderSortTitle} </Tooltip>
        }

        // showSorterTooltip 或者 tableShowSorterTooltip为false时, 无tooltip
        return renderSortTitle
      }


      newColumn = {
        ...newColumn,
        title: renderTitle(),
        onHeaderCell: (col) => {
          const cell: React.HTMLAttributes<HTMLElement> = column.onHeaderCell?.(col) || {}
          cell.onClick = (event: React.MouseEvent<HTMLElement>) => {
            triggerSorter({
              column,
              key: columnKey,
              sortOrder: nextSortOrder
            })
          }
          return cell
        }
      }
    }
    return newColumn
  })

  return finalColumns
}


const useFilterSorter = <RecordType extends AnyObject = AnyObject>(props: SorterConfig<RecordType>) => {
  const { prefixCls, showSorterTooltip, sortDirections, tableLocale, mergedColumns } = props


  const [sortStates, setSortStates] = React.useState<SortState<RecordType>[]>(collectionSortStates(mergedColumns, true))


  const mergedSorterStates = React.useMemo(() => {
    const collectedStates = collectionSortStates(mergedColumns, false)
    let validateState: SortState<RecordType>[] = []

    if (!collectedStates.length) {
      return sortStates
    }


    function patchStates(state: SortState<RecordType>) {
      validateState.push(state)
    }


    collectedStates.map(state => {
      patchStates(state)
    })

    return validateState
  }, [mergedColumns, sortStates])


  const triggerSorter = (sortState: SortState<RecordType>) => {
    let newSortState: SortState<RecordType>[] = []
    newSortState = [sortState]

    setSortStates(newSortState)
  }

  const transformColumns = (innerColumns: ColumnsType<RecordType>) => {
    return injectSorter(
      prefixCls,
      innerColumns,
      mergedSorterStates,
      triggerSorter,
      sortDirections,
      tableLocale,
      showSorterTooltip)
  }

  return [transformColumns, sortStates] as const
}


export default useFilterSorter