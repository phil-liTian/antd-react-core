import classNames from "classnames";
import React from "react";

interface IconWrapperProps {
  children?: React.ReactNode,
  prefixCls?: string
  className?: string
}

const IconWrapper = React.forwardRef<HTMLSpanElement, IconWrapperProps>((props, ref) => {
  const { children, prefixCls, className } = props
  const iconWrapperCls = classNames(`${prefixCls}-icon`, className)
  return <span className={iconWrapperCls} ref={ref}>{children}</span>
})


export default IconWrapper