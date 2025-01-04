import { useImperativeHandle } from 'react'
import { Ref } from "react";

function fillProxy(element: HTMLElement & { _antProxy?: Record<string, any> }, handler: Record<string, any>) {
  element._antProxy = element._antProxy || {};
  Object.keys(handler).forEach(key => {
    if (!(key in element._antProxy!)) {
      const ori = element[key];
      element._antProxy![key] = ori
      element[key] = handler[key];
    }
  })

  return element
}


export default function useProxyImperativeHandle<
  NativeElementType extends HTMLElement,
  ReturnRefType extends { nativeElement: NativeElementType }>(
    ref: Ref<any> | undefined, init: () => ReturnRefType) {
  return useImperativeHandle(ref, () => {
    const refObj = init()
    const { nativeElement } = refObj

    if (typeof Proxy !== 'undefined') {
      return new Proxy(nativeElement, {
        get(obj, prop) {
          if (refObj[prop]) {
            return refObj[prop]
          }
          return obj[prop]
        }
      })
    }

    return fillProxy(nativeElement, refObj)
  })
}