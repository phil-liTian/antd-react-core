import { AnyObject } from "@/components/_util/type"
import { ColumnsType, TableLocale } from "../../interface"
import { FilterDropdown } from "./FilterDropdown";
import { renderColumnTitle } from "../../util";

export interface FilterConfig<RecordType = AnyObject> {
  prefixCls: string,
  locale: TableLocale,
}


function injectFilter<RecordType extends AnyObject>(prefixCls: string, columns: ColumnsType<RecordType>, locale: TableLocale) {
  return columns.map((column, index) => {
    const { filterMode, filters, filterMultiple = true } = column
    let newColumn: ColumnsType<RecordType>[number] = column;

    if (newColumn.filters || newColumn.filterDropdown) {
      newColumn = {
        ...newColumn,
        title: <FilterDropdown
          column={column}
          locale={locale}
          filterMode={filterMode}
          tablePrefixCls={prefixCls}
          filterMultiple={filterMultiple}
          prefixCls={`${prefixCls}-filter`}>
          {renderColumnTitle(column.title, {})}
        </FilterDropdown>
      }
    }

    return newColumn
  })
}


export const useFilter = <RecordType extends AnyObject = AnyObject>(props: FilterConfig<RecordType>) => {
  const { prefixCls, locale: tableLocale } = props

  const transformColumns = (innerColumns: ColumnsType<RecordType>) => {
    return injectFilter(prefixCls, innerColumns, tableLocale)
  }


  return [transformColumns]
}