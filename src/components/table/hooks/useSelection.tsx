import { AnyObject } from "@/components/_util/type"
import { Dropdown } from 'antd/index'
import { DownOutlined } from '@ant-design/icons'
import { useMergedState } from 'vc-util'
import { ColumnsType, GetRowKey, Key, RowSelectMethod, SelectionItem, TableRowSelection, TransformColumns } from "../interface"
import React, { useCallback, useMemo } from "react"
import { ColumnType } from "rc-table"
import { conductCheck } from 'rc-tree/es/utils/conductUtil'
import { Checkbox, Radio } from 'antd'

export const SELECTION_COLUMN = {} as const
export const SELECTION_ALL = 'SELECT_ALL' as const
export const SELECTION_INVERT = 'SELECT_INVERT' as const
export const SELECTION_NONE = 'SELECT_NONE' as const
const EMPTY_LIST: React.Key[] = []
export type FixedType = 'left' | 'right' | boolean


export type INTERNAL_SELECTION_ITEM =
  | SelectionItem
  | typeof SELECTION_ALL
  | typeof SELECTION_INVERT
  | typeof SELECTION_NONE;

interface UseSelectionConfig<RecordType = AnyObject> {
  prefixCls: string;
  getRowKey: GetRowKey<RecordType>,
  pageData: RecordType[];
  childrenColumnName: string;
  getRecordByKey: (key: Key) => RecordType
}

const useSelection = <RecordType extends AnyObject = AnyObject>(
  config: UseSelectionConfig<RecordType>,
  rowSelection?: TableRowSelection<RecordType>): [TransformColumns<RecordType>, Set<Key>] => {
  const { prefixCls, getRowKey, pageData, childrenColumnName, getRecordByKey } = config

  const {
    type: selectionType,
    hideSelectAll,
    checkStrictly,
    columnWidth: selectionColWidth = '32px',
    selectedRowKeys,
    defaultSelectedRowKeys,
    // event
    onSelect,
    onChange: onSelectionChange,
    selections,
  } = rowSelection || {}

  const flattedData = useMemo(() => {
    return pageData
  }, [pageData])

  const [mergedSelectedKeys, setMergedSelectedKeys] = useMergedState(
    selectedRowKeys || defaultSelectedRowKeys || EMPTY_LIST,
    {
      value: selectedRowKeys
    }
  )

  const setSelectedKeys = useCallback((keys: Key[], method: RowSelectMethod) => {
    let availableKeys: Key[] = keys;
    let records: RecordType[] = []

    setMergedSelectedKeys(availableKeys)
    onSelectionChange?.(availableKeys, records)
  }, [setMergedSelectedKeys])

  const triggerSingleSelection = useCallback((key: Key, selected: boolean, keys: Key[], event: Event) => {
    if (onSelect) {
      const rows = keys.map((k) => getRecordByKey(k));
      onSelect(getRecordByKey(key), selected, rows, event)
    }

    setSelectedKeys(keys, 'single');
  }, [onSelect])

  const [derivedSelectedKeys] = useMemo(() => {
    // TODO tree
    // const { checkedKeys } = conductCheck(mergedSelectedKeys, true, {} as any, {} as any)
    // console.log('checkedKeys', checkedKeys);
    const checkedKeys = mergedSelectedKeys

    return [checkedKeys || []]
  }, [mergedSelectedKeys])


  const derivedSelectedKeySet = useMemo(() => {
    const keys = selectionType === 'radio' ? derivedSelectedKeys.slice(0, 1) : derivedSelectedKeys;

    return new Set(keys);
  }, [derivedSelectedKeys])

  const mergedSelections = useMemo(() => {
    // if ( selectionType === 'checkbox' ) return true
    if (!selections || hideSelectAll) return null

    const selectionList = selections === true ? [SELECTION_ALL, SELECTION_INVERT, SELECTION_NONE] : selections;


    return selectionList!.map((selection: INTERNAL_SELECTION_ITEM) => {
      if (selection === SELECTION_ALL) {
        return {
          key: 'all',
          text: '全选',
          onSelect() {
            setSelectedKeys(flattedData.map(getRowKey), 'single')
          }
        }
      } else if (selection === SELECTION_INVERT) {
        return {
          key: 'invert',
          text: '反选',
          onSelect() {

            setSelectedKeys(flattedData.map(getRowKey).filter(v => !derivedSelectedKeySet.has(v)), 'single')
          }
        }
      } else if (selection === SELECTION_NONE) {
        return {
          key: 'none',
          text: '取消选择',
          onSelect() {
            setSelectedKeys([], 'single')
          }
        }
      }


      return selection
    }).map(selection => ({
      ...selection,
      onSelect: (...rest) => {
        console.log('rest', rest);
        selection.onSelect?.(...rest)
      }
    }))
  }, [selectionType, derivedSelectedKeySet])


  const transformColumns = useCallback((columns: ColumnsType<RecordType>): ColumnsType<RecordType> => {
    let cloneColumns = [...columns]
    const keySet = new Set(derivedSelectedKeySet)

    if (!rowSelection) {
      return cloneColumns.filter(v => v !== SELECTION_COLUMN)
    }

    // ================== all ======================
    // 全选按钮 选中状态
    const recordKeys = flattedData.map(getRowKey)
    const checkedCurrentAll = recordKeys.every(key => keySet.has(key))
    const onSelectAllChange = () => {
      setSelectedKeys(checkedCurrentAll ? [] : recordKeys, 'single')
    }

    // ============ render ============
    let title: React.ReactNode
    let columnTitleCheckbox: React.ReactNode
    let renderCell: (_: RecordType, record: RecordType, index: number) => { node: React.ReactNode; checked: boolean }

    if (selectionType === 'radio') {
      renderCell = (_, record, index) => {
        const key = getRowKey(record, index)
        const checked = keySet.has(key)
        return {
          node: <Radio checked={checked} onChange={(event) => {
            if (!keySet.has(key)) {
              triggerSingleSelection(key, true, [key], event.nativeEvent)
            }
          }} />,
          checked: false
        }
      }
    } else {
      let customizeSelection: React.ReactNode
      if (mergedSelections) {
        const menu = {
          items: mergedSelections.map((selection, index) => {
            const { key, text, onSelect: onSelectionClick } = selection as SelectionItem

            return {
              key: key ?? index,
              label: text,
              onClick: () => {
                onSelectionClick?.(recordKeys)
              }
            }
          })
        }

        customizeSelection = <div className={`${prefixCls}-selection-extra`}>
          <Dropdown menu={menu}>
            <DownOutlined />
          </Dropdown>
        </div>
      }

      // checkbox 可全选
      columnTitleCheckbox = <Checkbox
        checked={checkedCurrentAll}
        onChange={onSelectAllChange}
      />

      title = !hideSelectAll && <div className={`${prefixCls}-selection`}>
        {columnTitleCheckbox}
        {customizeSelection}
      </div>

      renderCell = (_, record, index) => {
        const key = getRowKey(record, index)
        const checked = keySet.has(key)
        console.log('checked', keySet);


        return {
          node: <Checkbox
            checked={checked}
            onChange={event => {
              const { nativeEvent } = event
              checked ? keySet.delete(key) : keySet.add(key)

              triggerSingleSelection(key, false, [...keySet], nativeEvent)
            }} />,
          checked: false
        }
      }
    }

    let mergedFixed: FixedType = 'left'

    const renderSelectionCell = (_, record, index) => {
      const { node } = renderCell(_, record, index)
      return node
    }

    if (!cloneColumns.includes(SELECTION_COLUMN)) {
      cloneColumns = [SELECTION_COLUMN, ...cloneColumns]
    }

    const renderColumnTitle = () => {
      if (!rowSelection?.columnTitle) {
        return title
      }

      return rowSelection.columnTitle
    }

    const selectionColumn = {
      fixed: mergedFixed,
      title: renderColumnTitle(),
      width: selectionColWidth,
      className: `${prefixCls}-selection-column`,
      render: renderSelectionCell,
    } as ColumnType<RecordType>

    return cloneColumns.map(col => (col === SELECTION_COLUMN ? selectionColumn : col))
  }, [
    rowSelection,
    selectionColWidth,
    derivedSelectedKeySet,
    triggerSingleSelection,
    selectedRowKeys
  ])

  return [transformColumns, derivedSelectedKeySet]
}

export default useSelection