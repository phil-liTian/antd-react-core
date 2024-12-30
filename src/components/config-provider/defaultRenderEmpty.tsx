import React from "react";
import { Empty } from 'antd'

type ComponentName = 'Table'

interface EmptyProps {
  componentName?: ComponentName;
}



export type RenderEmptyHandler = (componentName?: ComponentName) => React.ReactNode;
const DefaultRenderEmpty: React.FC<EmptyProps> = (props) => {
  const { componentName } = props
  switch (componentName) {
    case 'Table':
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    default:
      return <Empty />
  }
}



export default DefaultRenderEmpty;