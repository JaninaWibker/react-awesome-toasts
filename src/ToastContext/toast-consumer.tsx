import * as React from 'react'
import { ContextConsumer } from './toast-provider'
import type { ToastContext } from '../types/toast-context'

type ToastConsumerProps = {
  children: (context: ToastContext) => React.ReactNode
}

class ToastConsumer extends React.PureComponent<ToastConsumerProps> {
  render() {
    return (
      <ContextConsumer>
        { (context: ToastContext) => this.props.children(context) }
      </ContextConsumer>
    )
  }
}

export default ToastConsumer
