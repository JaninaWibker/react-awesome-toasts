import React from 'react'
import { storiesOf } from '@storybook/react'
import { ToastProvider, ToastConsumer, withToast } from '../src'
import Toast from '../src/Toast'
import type { ToastContext } from '../src/types/toast-context'

const toast_props = {
  text: 'Message deleted',
  aria_label: 'Message deleted, click to undo',
  action_text: 'Undo',
}

class TestButton extends React.Component<{ dispatch: ToastContext }> {
  handle_click = () => {
    this.props.dispatch({ type: 'show', payload: toast_props })
  }

  render() {
    return <button onClick={this.handle_click}>Show toast</button>
  }
}

const ToastButton = withToast(TestButton)

const CustomToast = (props: any) => <div style={{ background: 'yellow', padding: 16 }}>{ props.text }</div>

storiesOf('Toast', module)
  .add('Using HOC', () => (
    <ToastProvider component={Toast}>
      <ToastButton />
    </ToastProvider>
  ))
  .add('Using consumer', () => (
    <ToastProvider component={Toast}>
      <ToastConsumer>
        {dispatch => (
          <button onClick={() => dispatch({ type: 'show', payload: { ...toast_props, on_action_click: id => dispatch({ type: 'hide', payload: id }) } })}>
            Show toast
          </button>
        )}
      </ToastConsumer>
    </ToastProvider>
  ))
  .add('Custom position', () => (
    <ToastProvider component={Toast} position="top-center">
      <ToastButton />
    </ToastProvider>
  ))
  .add('Custom timeout', () => (
    <ToastProvider component={Toast} timeout={1000}>
      <ToastButton />
    </ToastProvider>
  ))
  .add('Error toast', () => (
    <ToastProvider component={Toast}>
      <ToastConsumer>
        {dispatch => (
          <button onClick={() => dispatch({ type: 'show', payload: {...toast_props, on_action_click: id => dispatch({ type: 'hide', payload: id }), variant: 'error' } })}>
            Show toast
          </button>
        )}
      </ToastConsumer>
    </ToastProvider>
  ))
  .add('Custom component', () => (
    <ToastProvider component={CustomToast} position="top-center">
      <ToastConsumer>
        {dispatch => (
          <button onClick={() => dispatch({ type: 'show', payload: {...toast_props, on_action_click: id => dispatch({ type: 'hide', payload: id }), variant: 'error' } })}>
            Show toast
          </button>
        )}
      </ToastConsumer>
    </ToastProvider>
  ))
