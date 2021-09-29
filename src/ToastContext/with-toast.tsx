import * as React from 'react'
import ToastConsumer from './toast-consumer'
import * as T from '../types/toast-context'

const withToast: T.WithToast = (Component) => (props) => (
  <ToastConsumer>
    { (context: T.ToastContext) => <Component toast={context} {...props} /> }
  </ToastConsumer>
)

export default withToast
