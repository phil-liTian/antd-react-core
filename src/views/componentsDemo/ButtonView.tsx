import React from 'react'
import { Button } from '@c/index'

const Basic: React.FC = () => {
  return <Button>default</Button>
}


const ButtonView: React.FC = () => {
  return <>
    <Basic />
  </>
}

export default ButtonView