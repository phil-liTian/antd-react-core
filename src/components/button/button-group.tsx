import React from "react";
import { SizeType } from "./SizeContext";
import { ConfigContext } from "../config-provider";
import classNames from "classnames";

export interface ButtonGroupProps {
  size?: SizeType
  children?: React.ReactNode
  prefixCls?: string
}

export const GroupSizeContext = React.createContext<SizeType>(undefined);

const ButtonGroup: React.FC<ButtonGroupProps> = (props) => {
  const { prefixCls: customizePrefixCls, ...otherProps } = props
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('btn-group', customizePrefixCls)

  const classes = classNames(prefixCls)


  const { size } = props
  return <GroupSizeContext.Provider value={size}>
    <div {...otherProps} className={classes} />
  </GroupSizeContext.Provider>
};


export default ButtonGroup;