import { useState } from 'react'
import { TablePaginationConfig } from "../interface";
import { extendsObject } from '@/components/_util/extendsObject';

const DEFAULT_PAGE_SIZE = 10

export function usePagination(total: number, onChange: (current: number, pageSize: number) => void, pagination: TablePaginationConfig | false): [TablePaginationConfig, (current?: number, pageSize?: number) => void] {
  const { total: paginationTotal = 0, ...paginationObj } = typeof pagination === 'object' ? pagination : {}
  const [innerPagination, setInnerPagination] = useState<{ current?: number; pageSize?: number }>(() => {
    return ({
      current: 'defaultCurrent' in paginationObj ? paginationObj.defaultCurrent : 1,
      pageSize: 'defaultPageSize' in paginationObj ? paginationObj.defaultPageSize : DEFAULT_PAGE_SIZE
    })
  })


  const mergedPagination = extendsObject<Partial<TablePaginationConfig>>(
    innerPagination, paginationObj, { total: paginationTotal > 0 ? paginationTotal : total })

  const refreshPagination = (current?: number, pageSize?: number) => {
    setInnerPagination({ current, pageSize })
  }


  return [{ ...mergedPagination }, refreshPagination]
}
