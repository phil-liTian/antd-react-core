import InternalAlert from './Alert'
import ErrorBoundary from './ErrorBoundary'

type CompoundedComponent = typeof InternalAlert & {
  ErrorBoundary: typeof ErrorBoundary
}

const Alert = InternalAlert as CompoundedComponent

Alert.ErrorBoundary = ErrorBoundary

export default Alert
