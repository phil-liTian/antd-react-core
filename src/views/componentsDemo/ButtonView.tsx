import React from 'react'
import { PButton } from '@c/index'
import { Button } from 'antd'

const TestCallBack: React.FC = () => {
  const [count, setCount] = React.useState(0)
  const onClick = () => {
    setCount(count + 1)
  }

  return <div onClick={onClick}>
    {count}
    <Basic />
  </div>
}

const Basic: React.FC = () => {
  return <Button type='primary'>primary button</Button>
}

const ButtonGroup: React.FC = () => {
  return <Button.Group size='large'>
    <Button type='primary'>s1231</Button>
  </Button.Group>
}

const ButtonView: React.FC = () => {
  return <>
    {/* <TestCallBack /> */}
    <Basic />
    <ButtonGroup />
  </>
}

export default ButtonView