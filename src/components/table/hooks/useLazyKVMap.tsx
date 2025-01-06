import { AnyObject } from "packages/antd-components/_util/type"
import { GetRowKey, Key } from "../interface"
import React from "react"

interface MapCache<RecordType = AnyObject> {
  kvMap?: Map<Key, RecordType>,
  data?: readonly RecordType[],
  childrenColumnName?: string
}


export const useLazyKVMap = <RecordType extends AnyObject = AnyObject>(
  data: readonly RecordType[],
  childrenColumnName: string,
  getRowKey: GetRowKey<RecordType>) => {

  const mapCacheRef = React.useRef<MapCache<RecordType>>({})

  function getRecordByKey(key: Key): RecordType {
    if (!mapCacheRef.current || mapCacheRef.current.data !== data || mapCacheRef.current.childrenColumnName !== childrenColumnName) {
      const kvMap = new Map<Key, RecordType>()

      function dig(records: readonly RecordType[]) {
        records.map((record, index) => {
          const rowKey = getRowKey(record, index)
          kvMap.set(rowKey, record)

          // 处理tree结构
          if (record && typeof record === 'object' && childrenColumnName in record) {
            dig(record[childrenColumnName] || [])
          }
        })
      }

      dig(data)

      mapCacheRef.current = {
        kvMap,
        data,
        childrenColumnName
      }
    }

    return mapCacheRef.current.kvMap?.get(key)!
  }


  return [getRecordByKey]
}