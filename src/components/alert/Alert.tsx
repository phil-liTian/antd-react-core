import React, { useEffect } from "react";
import classNames from "classnames";
import { InfoCircleFilled, CloseOutlined, CheckCircleFilled, CloseCircleFilled, ExclamationCircleFilled } from '@ant-design/icons'
import CSSMotion from 'rc-motion'
import { composeRef } from 'vc-util'
import { ConfigContext } from '../config-provider/index'
import useStyle from './style/index'

export interface AlertRef {
  nativeElement: HTMLDivElement
}

export interface AlertProps {
  prefixCls?: string
  message?: React.ReactNode
  description?: React.ReactNode
  showIcon?: boolean
  banner?: boolean
  type?: 'success' | 'info' | 'warning' | 'error'
  closeIcon?: React.ReactNode,
  style?: React.CSSProperties,
  closable?: boolean,
  onClose?: React.MouseEventHandler<HTMLButtonElement>
  afterClose?: () => void
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

interface CloseIconProps {
  isClosable: boolean;
  closeIcon: AlertProps['closeIcon']
  prefixCls: AlertProps['prefixCls']
  handleClose: AlertProps['onClose']
}

const CloseIconNode: React.FC<CloseIconProps> = props => {
  const { isClosable, closeIcon, prefixCls, handleClose } = props
  const mergedCloseIcon = closeIcon === true || closeIcon === undefined ? <CloseOutlined /> : closeIcon

  return isClosable && <button
    type="button"
    className={`${prefixCls}-close-icon`}
    onClick={handleClose}>
    {mergedCloseIcon}
  </button>
}

const Alert = React.forwardRef<AlertRef, AlertProps>((props, ref) => {
  const { prefixCls: customizePrefixCls, showIcon, banner, type, message, closeIcon, description, style, closable, afterClose } = props

  const [closed, setClosed] = React.useState(false)
  const { getPrefixCls } = React.useContext(ConfigContext)
  const prefixCls = getPrefixCls('alert', customizePrefixCls)
  const isShowIcon = showIcon === undefined && banner ? true : showIcon
  const [WrapCSSVar] = useStyle(prefixCls)
  const internalRef = React.useRef<HTMLDivElement>(null)

  React.useImperativeHandle(ref, () => ({
    nativeElement: internalRef.current!,
  }))

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    setClosed(true)
    props.onClose?.(e)
  }


  const isCloseable = React.useMemo(() => {
    if (typeof closable === 'boolean') {
      return closable
    }

    if (closeIcon !== false && closable !== undefined && closable !== null) {
      return true
    }

    return !!closable
  }, [closable, closeIcon])


  const mergedCloseIcon = React.useMemo(() => {
    return closeIcon
  }, [closeIcon])

  const alertCls = classNames(prefixCls, `${prefixCls}-${type}`, {

  })

  return WrapCSSVar(<CSSMotion
    visible={!closed}
    motionName={`${prefixCls}-motion`}
    motionAppear={false}
    motionEnter={false}
    onLeaveStart={(node) => {
      return ({ maxHeight: node.offsetHeight })
    }}
    onLeaveEnd={afterClose}>
    {({ className: motionClassName, style: motionStyle }, setRef) => (<div style={{ ...style, ...motionStyle }} ref={composeRef(internalRef, setRef)} className={classNames(alertCls, motionClassName)}>
      {isShowIcon && <IconNode type={type} prefixCls={prefixCls} />}
      <div className={`${prefixCls}-content`}>
        {message && <div className={`${prefixCls}-message`}>{message}</div>}
        {description && <div className={`${prefixCls}-description`}>{description}</div>}
      </div>

      <CloseIconNode
        prefixCls={prefixCls}
        isClosable={isCloseable}
        closeIcon={mergedCloseIcon}
        handleClose={handleClose} />
    </div>)
    }
  </CSSMotion >)
})

export default Alert