import { AnyObject } from "@/components/_util/type";
import { ColumnsType, ColumnType } from "../interface";
import React from "react";
import { renderColumnTitle } from "../util";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";


interface SorterConfig<RecordType extends AnyObject = AnyObject> {
  prefixCls: string,
  // columns: ColumnsType<RecordType>,
}


function injectSorter<RecordType extends AnyObject = AnyObject>(prefixCls: string, columns: ColumnsType<RecordType>) {
  return columns.map(column => {
    let newColumn: ColumnType<RecordType> = column;
    if (newColumn.sorter) {
      let sorter: React.ReactNode
      if (newColumn.sortIcon) {
        sorter = column.sortIcon?.({ sortIcon: 'ascend' })
      } else {
        const upNode: React.ReactNode = <CaretUpOutlined className={`${prefixCls}-column-sorter-up`} />
        const downNode: React.ReactNode = <CaretDownOutlined className={`${prefixCls}-column-sorter-down`} />

        sorter = <span className={`${prefixCls}-column-sorter`}>
          <span className={`${prefixCls}-column-sorter-inner`}>
            {upNode}
            {downNode}
          </span>
        </span>
      }

      const renderTitle = () => {
        const columnSortersClass = `${prefixCls}-column-sorters`;
        const renderColumnTitleWrapper = <span className={`${prefixCls}-column-title`}>
          {renderColumnTitle(column.title, {})}
        </span>
        const renderSortTitle = <div className={columnSortersClass}>
          {renderColumnTitleWrapper}
          {sorter}
        </div>

        return renderSortTitle
      }


      newColumn = {
        ...newColumn,
        // title: <div>q31231</div>
        title: renderTitle()

        // () => {
        //   // const renderSortTitle = 
        //   // console.log('sorter', renderSortTitle);

        //   return 
        // }
      }

      console.log('newColumn', newColumn);

    }
    return newColumn
  })
}


const useFilterSorter = <RecordType extends AnyObject = AnyObject>(props: SorterConfig<RecordType>) => {
  const { prefixCls } = props
  const transformColumns = (innerColumns: ColumnsType<RecordType>) => {
    return injectSorter(prefixCls, innerColumns)
  }

  return [transformColumns]
}


export default useFilterSorter