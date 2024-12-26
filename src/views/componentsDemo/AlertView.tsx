import { Alert } from '@c/index'
import React from 'react'


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
  const [error, setError] = React.useState<Error>()
  console.log('type', type);

  // setTimeout(() => {
  //   setType('info')
  // }, 1000);
  const handleClose = (e) => {
    console.log('e', e);
  }

  return <>
    <Alert.ErrorBoundary>
      <ThrowError />
      <Alert message='Success Text' type='success' description='123' onClose={handleClose} />
      {/* <Alert message='Success Text' type='info' /> */}
    </Alert.ErrorBoundary>
  </>
}

export default App


