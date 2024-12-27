import React from "react";
import { composeRef } from 'rc-util'
import { ConfigContext } from "../config-provider";
import classNames from "classnames";
import useStyle from './style'
import { ButtonColorType, ButtonType, ButtonVariantType } from "./buttonHelpers";
import { SizeType } from "./SizeContext";
import { LoadingIcon } from "./LoadingIcon";
import Group, { GroupSizeContext } from './button-group'

type MergedHTMLAttributes = Omit<React.ButtonHTMLAttributes<HTMLElement>, 'type' | 'color'>

export interface BaseButtonProps {
  type?: ButtonType;
  prefixCls?: string;
  children?: React.ReactNode;
  variant?: ButtonVariantType;
  color?: ButtonColorType
  size?: SizeType
}

export interface ButtonProps extends BaseButtonProps, MergedHTMLAttributes {

}

type ColorVariantPairType = [color?: ButtonColorType, variant?: ButtonVariantType]

const ButtonTypeMap: Record<ButtonType, ColorVariantPairType> = {
  default: ['default', 'outlined'],
  primary: ['primary', 'solid'],
  dashed: ['default', 'dashed'],
  link: ['primary', 'link'],
  text: ['default', 'text'],
}

const InternalCompoundButton = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { prefixCls: customizePrefixCls, children, variant, color, type, size: customizeSize } = props

  const { getPrefixCls } = React.useContext(ConfigContext)
  const groupSize = React.useContext(GroupSizeContext)

  const prefixCls = getPrefixCls('btn', customizePrefixCls)
  const [WrapCSSVar] = useStyle(prefixCls)
  const mergedType = type || 'default'

  const iconNode = <LoadingIcon prefixCls={prefixCls} />

  const [mergedColor, mergedVariant] = React.useMemo(() => {
    if (color && variant) {
      return [color, variant]
    }

    return ButtonTypeMap[mergedType] || []
  }, [color, variant])

  const classes = classNames(prefixCls, {
    [`${prefixCls}-color-${mergedType}`]: true,
    [`${prefixCls}-variant-${mergedVariant}`]: mergedVariant
  });

  const kids = children

  const buttonRef = React.useRef<HTMLButtonElement>(null)


  // =========================  events =============================
  const handleClick = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('e', buttonRef.current);
    props.onClick?.(e)
  }, [props.onClick])

  // React.useEffect(() => {
  //   console.log('buttonRef---->');
  // }, [handleClick])

  // e => {
  //   console.log('e', buttonRef.current);
  // }

  let buttonNode = <button ref={composeRef(buttonRef, ref)} onClick={handleClick} className={classes}>
    {iconNode}
    {kids}
  </button>

  return WrapCSSVar(buttonNode)
})

type CompoundedComponent = typeof InternalCompoundButton & {
  Group: typeof Group
}

const Button = InternalCompoundButton as CompoundedComponent

Button.Group = Group

export default Button
