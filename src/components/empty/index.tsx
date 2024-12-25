import React from "react"


interface EmptyProps {
  prefixCls: string
}

type CompoundedComponent = React.FC<EmptyProps>
const Empty: CompoundedComponent = () => {
  return <div></div>
}

export default Empty