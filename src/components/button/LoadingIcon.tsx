import React from "react";
import { LoadingOutlined } from '@ant-design/icons'
import IconWrapper from "./IconWrapper";

interface InnerLoadingIconProps {
  prefixCls?: string
}

const InnerLoadingIcon = React.forwardRef<HTMLSpanElement, InnerLoadingIconProps>(
  (props, ref) => {
    const { prefixCls } = props
    return <IconWrapper ref={ref} prefixCls={prefixCls}>
      <LoadingOutlined  />
    </IconWrapper>
  }
)

interface LoadingIconProps {
  prefixCls?: string
}

export const LoadingIcon: React.FC<LoadingIconProps> = (props) => {
  const { prefixCls } = props
  return <InnerLoadingIcon prefixCls={prefixCls} />
}