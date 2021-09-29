import * as React from 'react'
import { ContextConsumer } from './toast-provider'
import * as T from '../types/toast-context'

class ToastConsumer extends React.PureComponent<T.ToastConsumerProps> {
  render() {
    return (
      <ContextConsumer>
        { (context: T.ToastContext) => this.props.children(context) }
      </ContextConsumer>
    )
  }
}

export default ToastConsumer
