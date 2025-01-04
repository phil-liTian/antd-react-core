import { AnyObject } from '@/components/_util/type'
import { Input } from 'antd'
import { TableLocale } from '../../interface'

interface FilterSearchProps<RecordType extends AnyObject = AnyObject> {
  value: string
  tablePrefixCls: string
  locale: TableLocale
}

const FilterSearch = <RecordType extends AnyObject = AnyObject>(props: FilterSearchProps<RecordType>) => {
  const { tablePrefixCls, value, locale } = props
  return <div className={`${tablePrefixCls}-filter-dropdown-search`}>
    <Input
      placeholder={locale.filterSearchPlaceholder}
      value={value} />
  </div>
}

export default FilterSearch