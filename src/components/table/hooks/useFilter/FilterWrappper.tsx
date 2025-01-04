import React from "react";

export interface FilterDropdownMenuWrapperProps {
  className?: string
}

const FilterDropdownMenuWrapper = React.forwardRef<HTMLDivElement, React.PropsWithChildren<FilterDropdownMenuWrapperProps>>((props, ref) => {
  const { children, className } = props
  return <div ref={ref} className={className}>{children}</div>
})

export default FilterDropdownMenuWrapper;