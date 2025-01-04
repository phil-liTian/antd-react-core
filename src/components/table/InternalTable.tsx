import { AnyObject } from '@c/_util/type'
import { omit } from 'vc-util'
import { TableProps as RcTableProps, Reference as RcReference, INTERNAL_HOOKS } from 'rc-table'
import { ColumnsType, GetRowKey, SorterTooltipProps, SortOrder, TableLocale, TablePaginationConfig, TableRowSelection } from './interface'
import RcTable from './RcTable/index'
import React, { useCallback } from 'react'
import { ConfigContext, SizeType } from '../config-provider'
import classNames from 'classnames'
import useStyle from './style'
import { Pagination, Spin } from 'antd'
import { usePagination } from './hooks/usePagination'
import { SpinProps } from '../spin'
import DefaultRenderEmpty from '../config-provider/defaultRenderEmpty'
import { ConfigConsumerProps } from '../config-provider/context'
import useSelection from './hooks/useSelection'
import { useLazyKVMap } from './hooks/useLazyKVMap'
import { useFilter } from './hooks/useFilter'
import defaultLocal from '../locale/zh_CN'
import useFilterSorter from './hooks/useSorter'

// export type RefInternalTable = <RecordType = AnyObject>(props) => React.ReactElement

export interface TableProps<RecordType = AnyObject> extends
  Omit<RcTableProps<RecordType>, 'data' | 'columns' | 'emptyText' | 'transformColumns'> {
  prefixCls?: string
  columns?: ColumnsType<RecordType>
  dataSource?: RcTableProps['data']
  // pagination
  pagination?: false | TablePaginationConfig

  // spin
  loading?: boolean | SpinProps

  // style
  size?: SizeType
  bordered?: boolean
  rootClassName?: string

  // ======= event ========
  onChange?: (pagination: TablePaginationConfig) => void

  locale?: TableLocale

  // rowSelction
  rowSelection?: TableRowSelection<RecordType>,

  // sort
  sortDirections?: SortOrder[]
  showSortTooltip?: boolean | SorterTooltipProps

  // virtual
  virtual?: boolean

}

const InternalTable = <RecordType extends AnyObject = AnyObject>(props: TableProps, ref: React.MutableRefObject<HTMLDivElement>) => {
  const {
    prefixCls: customizePrefixCls,
    bordered,
    dataSource,
    pagination,
    loading,
    rootClassName,
    locale,
    childrenColumnName: legacyChildrenColumnName = ' children',
    rowSelection,
    rowKey = 'key'
  } = props
  const { direction, getPrefixCls, renderEmpty, locale: contextLocal = defaultLocal } = React.useContext<ConfigConsumerProps>(ConfigContext)
  const prefixCls = getPrefixCls('table', customizePrefixCls)
  const [wrapCSSVar] = useStyle(prefixCls)
  const tableLocale: TableLocale = { ...contextLocal.Table }
  // ========================== Refs ===================================
  const rootRef = React.useRef<HTMLDivElement>(null)
  const tblRef = React.useRef<RcReference>(null)

  const wrapperClassNames = classNames(`${prefixCls}-wrapper`, rootClassName)
  const rawData = dataSource || []

  const TableComponent = RcTable

  const mergedColumns = React.useMemo(() => {
    return props.columns
  }, [props.columns])

  const pageData = React.useMemo<RecordType[]>(() => {
    return rawData as unknown as RecordType[]
  }, [rawData])

  // TODO: Filter
  const mergedData = pageData


  // =========================== Empty ==============================
  const emptyText = typeof locale?.emptyText !== 'undefined' ? locale?.emptyText : renderEmpty?.('Table') || <DefaultRenderEmpty componentName="Table" />

  // ============================= Spin ===============================
  let spinProps: SpinProps | undefined
  if (typeof loading === 'object') {
    spinProps = {
      spinning: true,
      ...loading,
    }
  } else if (typeof loading === 'boolean') {
    spinProps = {
      spinning: !!loading,
    }
  }

  // =============================== row selection ===============================

  const getRowKey = React.useMemo<GetRowKey<RecordType>>(() => {
    if (typeof rowKey === 'function') {
      return rowKey
    }

    return (record: RecordType) => record?.[rowKey as string]
  }, [rowKey])

  const [getRecordByKey] = useLazyKVMap(rawData, legacyChildrenColumnName, getRowKey)

  const [transformSelectionColumns] = useSelection({
    prefixCls,
    getRowKey,
    childrenColumnName: legacyChildrenColumnName,
    pageData,
    getRecordByKey
  }, rowSelection)

  // ============================== filter ==============================
  const [transformFilterColumns] = useFilter({ prefixCls, locale: tableLocale })


  // ============================== sort ==============================

  const [transformSorterColumns] = useFilterSorter({ prefixCls })


  // ============================== render ===============================
  const transformColumns = useCallback(innerColumns => {
    return transformSelectionColumns(transformFilterColumns(transformSorterColumns(innerColumns)))
  }, [transformSelectionColumns, transformFilterColumns, transformSorterColumns])


  // ============================== pagination ===============================
  const onPaginationChange = (current: number, pageSize: number) => {
    // props.onChange?.(pagination)
  }

  const [mergedPagination, resetPagination] = usePagination(mergedData.length, onPaginationChange, pagination!)


  let bottomPaginationNode: React.ReactNode
  let topPaginationNode: React.ReactNode
  if (pagination !== false && mergedPagination?.total) {
    let paginationSize: TablePaginationConfig['size']
    const renderPagination = (position: string) => (
      <Pagination
        {...mergedPagination}
        className={classNames(`${prefixCls}-pagination ${prefixCls}-pagination-${position}`)}
        size={paginationSize}
      />
    )

    const defaultPosition = direction === 'rtl' ? 'left' : 'right'
    const { position } = mergedPagination
    if (position !== null && Array.isArray(position)) {
      const topPos = position.find((p) => p.includes('top'))
      const bottomPos = position.find((p) => p.includes('bottom'))
      const isDisabled = position.every((p) => `${p}` === 'none')

      if (!topPos && !bottomPos && !isDisabled) {
        bottomPaginationNode = renderPagination(defaultPosition)
      }

      if (topPos) {
        topPaginationNode = renderPagination(topPos.toLowerCase().replace('top', ''))
      }

      if (bottomPos) {
        bottomPaginationNode = renderPagination(bottomPos.toLowerCase().replace('bottom', ''))
      }
    } else {
      bottomPaginationNode = renderPagination(defaultPosition)
    }
  }

  const tableProps: TableProps<RecordType> = omit(props, [])


  return wrapCSSVar(<div
    ref={rootRef}
    className={wrapperClassNames}>
    <Spin spinning={false} {...spinProps}>
      {topPaginationNode}
      <TableComponent
        {...tableProps}
        ref={tblRef}
        emptyText={emptyText}
        prefixCls={prefixCls}
        className={classNames({
          [`${prefixCls}-bordered`]: bordered
        })}
        columns={mergedColumns as RcTableProps['columns']}
        data={pageData}
        transformColumns={transformColumns as any}
        // 加上当前参数 transformColumns才会自动执行
        internalHooks={INTERNAL_HOOKS} />
      {bottomPaginationNode}
    </Spin>
  </div>)
}


export default React.forwardRef(InternalTable as any) as any