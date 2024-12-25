import React from "react";
import classNames from "classnames";
import { InfoCircleFilled, CloseOutlined, CheckCircleFilled, CloseCircleFilled, ExclamationCircleFilled } from '@ant-design/icons'
import { ConfigContext } from '../config-provider/index'
import useStyle from './style/index'

export interface AlertRef {
  nativeElement: HTMLDivElement
}

export interface AlertProps {
  prefixCls?: string
  message?: React.ReactNode
  showIcon?: boolean
  banner?: boolean
  type?: 'success' | 'info' | 'warning' | 'error'
}

interface IconNodeProps {
  type: AlertProps['type'],
  prefixCls: string,
}

const iconMapFilled = {
  success: CheckCircleFilled,
  info: InfoCircleFilled,
  error: CloseCircleFilled,
  warning: ExclamationCircleFilled,
};


const IconNode: React.FC<IconNodeProps> = (props) => {
  const { type, prefixCls } = props
  const iconType = iconMapFilled[type!]

  return React.createElement(iconType, { className: `${prefixCls}-icon` })
}

const Alert = React.forwardRef<AlertRef, AlertProps>((props, ref) => {
  const { prefixCls: customizePrefixCls, showIcon, banner, type, message } = props

  const [closed, setClosed] = React.useState(false)
  const { getPrefixCls } = React.useContext(ConfigContext)
  const prefixCls = getPrefixCls('alert', customizePrefixCls)
  const isShowIcon = showIcon === undefined && banner ? true : showIcon
  const [WrapCSSVar] = useStyle(prefixCls)

  const alertCls = classNames(prefixCls, `${prefixCls}-${type}`, {

  })

  return WrapCSSVar(<div className={alertCls}>
    {<IconNode type={type} prefixCls={prefixCls} />}
    <div className={`${prefixCls}-content`}>
      {message && <div className={`${prefixCls}-message`}>{message}</div>}
    </div>
  </div>)
})

export default Alert