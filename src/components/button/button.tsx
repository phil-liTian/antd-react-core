import React from "react";
import { ConfigContext } from "../config-provider";
import classNames from "classnames";
import useStyle from './style'

export interface BaseButtonProps {
  prefixCls?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends BaseButtonProps {

}

const InternalCompoundButton: React.FC<ButtonProps> = (props) => {
  const { prefixCls: customizePrefixCls, children } = props

  const { getPrefixCls } = React.useContext(ConfigContext)
  const prefixCls = getPrefixCls('btn', customizePrefixCls)
  const [WrapCSSVar] = useStyle(prefixCls)
  const classes = classNames(prefixCls, {
    [`${prefixCls}-color-default`]: true,
  });

  const kids = children

  let buttonNode = <button className={classes}>{kids}</button>

  return WrapCSSVar(buttonNode)
};

const Button = InternalCompoundButton

export default Button
