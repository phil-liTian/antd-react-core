import { AnyObject } from '@c/_util/type'
import type { TableProps as RcTableProps, Reference as RcReference } from 'rc-table'
import { ColumnsType, SorterTooltipProps, SortOrder, TableLocale, TablePaginationConfig } from './interface'
import RcTable from './RcTable/index'
import React from 'react'
import { ConfigContext, SizeType } from '../config-provider'
import classNames from 'classnames'
import useStyle from './style'
import { Pagination, Spin } from 'antd'
import { usePagination } from './hooks/usePagination'
import { SpinProps } from '../spin'
import DefaultRenderEmpty from '../config-provider/defaultRenderEmpty'
import { ConfigConsumerProps } from '../config-provider/context'

export interface TableProps<RecordType = AnyObject> extends
  Omit<RcTableProps<RecordType>, 'data' | 'columns' | 'emptyText'> {
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

  // sort
  sortDirections?: SortOrder[]
  showSortTooltip?: boolean | SorterTooltipProps

  // virtual
  virtual?: boolean
}

const InternalTable = (props: TableProps, ref: React.MutableRefObject<HTMLDivElement>) => {
  const { prefixCls: customizePrefixCls, bordered, dataSource, pagination, loading, rootClassName } = props
  const { direction, getPrefixCls, renderEmpty } = React.useContext<ConfigConsumerProps>(ConfigContext)
  const prefixCls = getPrefixCls('table', customizePrefixCls)
  const [wrapCSSVar] = useStyle(prefixCls)
  // ========================== Refs ===================================
  const rootRef = React.useRef<HTMLDivElement>(null)
  const tblRef = React.useRef<RcReference>(null)

  const wrapperClassNames = classNames(`${prefixCls}-wrapper`, rootClassName)
  const rawData = dataSource || []

  const TableComponent = RcTable

  const mergedColumns = React.useMemo(() => {
    return props.columns
  }, [props.columns])

  const pageData = React.useMemo(() => {
    return rawData
  }, [rawData])

  // TODO: Filter
  const mergedData = pageData


  // =========================== Empty ==============================
  const emptyText = renderEmpty?.('Table') || <DefaultRenderEmpty componentName="Table" />

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

  return wrapCSSVar(<div
    ref={rootRef}
    className={wrapperClassNames}>
    <Spin spinning={false} {...spinProps}>
      {topPaginationNode}
      <TableComponent
        ref={tblRef}
        emptyText={emptyText}
        prefixCls={prefixCls}
        className={classNames({
          [`${prefixCls}-bordered`]: bordered
        })}
        columns={mergedColumns as RcTableProps['columns']}
        data={pageData} />
      {bottomPaginationNode}
    </Spin>
  </div>)
}


export default React.forwardRef(InternalTable as any)