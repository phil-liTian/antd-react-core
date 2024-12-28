import { AlertRef } from '@/components/alert/Alert';
import { PAlert } from '@c/index'
import React from 'react'
import Marquee from 'react-fast-marquee'


const ThrowError: React.FC = () => {
  const [error, setError] = React.useState<Error>();
  const onClick = () => {
    setError(new Error('An Uncaught Error'));
  };

  if (error) {
    throw error;
  }
  return (
    <button onClick={onClick}>
      Click me to throw a error
    </button>
  );
};

const App: React.FC = () => {
  const [type, setType] = React.useState('success')
  const [state, setState] = React.useState(0)
  const [error, setError] = React.useState<Error>()

  // setTimeout(() => {
  //   setType('info')
  // }, 1000);
  const handleClose = (e) => {
    console.log('e', e);
  }

  const alertRef = React.useRef<AlertRef>(null)

  const handleClick = () => {
    setState(state + 1)
    // console.log('a===>', alertRef.current?.nativeElement);
  }

  return <>
    <PAlert.ErrorBoundary>
      {/* <ThrowError /> */}
      <PAlert showIcon ref={alertRef} message='Success Text' type='success' description='123' onClose={handleClose} closable />

      <PAlert style={{ margin: '10px 0' }} showIcon message='Success Text' type='error' onClose={handleClose} />

      <PAlert showIcon message='Success Text' type='info' onClose={handleClose} />

      <PAlert showIcon style={{ margin: '10px 0' }} message='Success Text' type='warning' onClose={handleClose} />
      {/* <PAlert message='Success Text' type='info' /> */}


      <PAlert type='success' showIcon message={<Marquee pauseOnHover gradient={false}>I can be a React component, multiple React components, or just some text.</Marquee>} />
    </PAlert.ErrorBoundary>
  </>
}

export default App


