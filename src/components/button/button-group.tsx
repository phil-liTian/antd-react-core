import React from "react";
import { SizeType } from "./SizeContext";

export interface ButtonGroupProps {
  size?: SizeType
  children?: React.ReactNode
  prefixCls?: string
}

export const GroupSizeContext = React.createContext<SizeType>(undefined);

const ButtonGroup: React.FC<ButtonGroupProps> = (props) => {
  const { prefixCls, ...otherProps } = props
  const { size } = props
  return <GroupSizeContext.Provider value={size}>
    <div {...otherProps} />
  </GroupSizeContext.Provider>
};


export default ButtonGroup;