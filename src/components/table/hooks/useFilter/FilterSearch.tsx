import { AnyObject } from '@/components/_util/type'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { TableLocale } from '../../interface'

interface FilterSearchProps<RecordType extends AnyObject = AnyObject> {
  value: string
  tablePrefixCls: string
  locale: TableLocale
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FilterSearch = <RecordType extends AnyObject = AnyObject>(props: FilterSearchProps<RecordType>) => {
  const { tablePrefixCls, value, locale, onChange } = props
  return <div className={`${tablePrefixCls}-filter-dropdown-search`}>
    <Input
      prefix={<SearchOutlined />}
      placeholder={locale.filterSearchPlaceholder}
      value={value}
      onChange={onChange} />
  </div>
}

export default FilterSearch