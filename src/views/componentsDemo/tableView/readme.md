1. dependencies: Pagination, Checkbox、Radio、Input、Button、Tree、Dropdown、Spin、Menu、Empty、Tooltip

2. transformColumns返回处理后的columns(包括selection、sorter、filter逻辑)

3. rowSelection: 
  3.1 useLazyKVMap hook: 缓存record与key的映射关系, 提高存取效率。
  3.2 renderCell 时向外抛出customizeRenderCell方法, 可自定义cell的渲染内容。同columnTitle逻辑。

4. sorter
  4.1 通过injectSort方法向table中注入排序方法。sortIcon支持自定义sortIcon的内容。
  4.2 如何实现通过sorter或者sort里面的compareFn函数进行排序？

5. filter
  5.1 同样的,通过injectFilter方法向table中注入filter方法。