import { extendsObject } from "@/components/_util/extendsObject"
import { AnyObject } from "@/components/_util/type"
import { FilterFilled } from '@ant-design/icons'
import { Dropdown, DropDownProps, Menu, Checkbox, Radio, Tree } from 'antd'
import Button from '@c/button'
import React from "react"
import { ColumnType, TableLocale } from "../../interface"
import FilterSearch from "./FilterSearch"
import FilterDropdownMenuWrapper from './FilterWrappper'
import classNames from "classnames"

export interface FilterDropdownProps<RecordType extends AnyObject> {
  prefixCls: string,
  tablePrefixCls: string,
  children: React.ReactNode,
  column: ColumnType<RecordType>,
  filterMultiple: boolean,
  filterMode?: 'tree' | 'menu',
  locale: TableLocale
}

function renderFilterItems({ filters, filterMultiple }) {

  return filters.map((filter, index) => {
    const Component = filterMultiple ? Checkbox : Radio
    let item = {
      label: <>
        <Component />
        <span>{filter.text}</span>
      </>,
      key: filter.value
    }

    return item
  })
}

export const FilterDropdown = <RecordType extends AnyObject = AnyObject>(props: FilterDropdownProps<RecordType>) => {
  const { prefixCls, tablePrefixCls, children, column, filterMultiple, filterMode = 'menu', locale } = props

  const getTreeData = ({ filters }) => {
    return filters.map((filter) => {
      let item = {
        title: filter.text,
        key: filter.value
      }

      return item
    })
  }

  const [searchValue] = React.useState('')
  let filtered = false
  let dropdownContent: React.ReactNode
  if (typeof column.filterDropdown === 'function') {

  } else if (column.filterDropdown) {

  } else {
    const getFilterComponent = () => {
      const items = renderFilterItems({ filters: column.filters || [], filterMultiple })

      if (filterMode === 'tree') {
        return <>
          <FilterSearch
            locale={locale}
            tablePrefixCls={tablePrefixCls}
            value={searchValue} />
          <div className={`${tablePrefixCls}-filter-dropdown-tree`}>
            {
              filterMultiple ? <Checkbox>全选</Checkbox> : null
            }
            <Tree
              checkable
              treeData={getTreeData({ filters: column.filters || [] })} />
          </div>
        </>
      }

      return <>
        <FilterSearch
          locale={locale}
          tablePrefixCls={tablePrefixCls}
          value={searchValue} />
        <Menu items={items} />
      </>
    }

    dropdownContent = (<>
      {getFilterComponent()}
      <div className={`${prefixCls}-dropdown-btns`}>
        <Button type="link" size='small'>重置</Button>
        <Button type="primary" size="small">确认</Button>
      </div>
    </>)

  }

  dropdownContent = <FilterDropdownMenuWrapper className={`${prefixCls}-dropdown`}>
    {dropdownContent}
  </FilterDropdownMenuWrapper>



  // trigger
  const getDropdownTrigger = () => {
    let filterIcon: React.ReactNode
    if (typeof column.filterIcon === 'function') {
      filterIcon = column.filterIcon(filtered)
    } else {
      filterIcon = <FilterFilled />
    }

    return <span className={classNames(`${prefixCls}-trigger`)}>{filterIcon}</span>
  }

  const mergedDropdownprops = extendsObject<DropDownProps>({
    children: getDropdownTrigger(),
    placement: 'bottomRight'
    // open: true
  }, {
    dropdownRender: () => {
      return dropdownContent
    }
  })

  return <div className={`${prefixCls}-column`}>
    <span className={`${tablePrefixCls}-column-title`}>{children}</span>
    <Dropdown {...mergedDropdownprops} />
  </div>
}