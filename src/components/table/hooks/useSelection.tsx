import { AnyObject } from "@/components/_util/type"
import { ColumnsType, Key, TableRowSelection, TransformColumns } from "../interface"
import React, { useCallback } from "react"
import { ColumnType } from "rc-table"
import { Checkbox, Radio } from 'antd'

export const SELECTION_COLUMN = {} as const

interface UseSelectionConfig<RecordType = AnyObject> {
  prefixCls: string
}

const useSelection = <RecordType extends AnyObject = AnyObject>(
  config: UseSelectionConfig<RecordType>,
  rowSelection: TableRowSelection<RecordType>): [TransformColumns<RecordType>, Set<Key>] => {

  const { type: selectionType } = rowSelection

  const transformColumns = useCallback((columns: ColumnsType<RecordType>): ColumnsType<RecordType> => {
    let cloneColumns = [...columns]
    if (!rowSelection) {
      return cloneColumns.filter(v => v !== SELECTION_COLUMN)
    }


    // ============ render ============
    let title: React.ReactNode
    let columnTitleCheckbox: React.ReactNode
    let renderCell: (_: RecordType, record: RecordType, index: number) => { node: React.ReactNode; checked: boolean }

    if ( selectionType === 'radio' )  {
      renderCell = (_, record, index) => {
        return {
          node: <Radio />,
          checked: false
        }
      }
    } else {
      renderCell = (_, record, index) => {
        return {
          node: <Checkbox />,
          checked: false
        }
      }
    }

    const renderSelectionCell = (_, record, index) => {
      const { node } = renderCell(_, record, index)
      return node
    }

    if ( !cloneColumns.includes(SELECTION_COLUMN) ) {
      cloneColumns = [SELECTION_COLUMN, ...cloneColumns]
    }

    const renderColumnTitle = () => {
      if ( !rowSelection?.columnTitle ) {
        return title
      }

      return rowSelection.columnTitle
    }

    const selectionColumn = {
      title: renderColumnTitle(),
      render: renderSelectionCell,
    } as ColumnType<RecordType>

    return cloneColumns.map(col => (col === SELECTION_COLUMN ? selectionColumn : col))

  }, [rowSelection])

  const derivatedSelectedKeySet = new Set<Key>()


  return [transformColumns, derivatedSelectedKeySet]
}

export default useSelection