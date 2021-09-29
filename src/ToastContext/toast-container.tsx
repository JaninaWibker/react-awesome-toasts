import React from 'react'
import Toast from '../Toast'
import classnames from '../utilities/classnames'
import next_frame from '../utilities/next-frame'
import * as T from '../types/toast-context'
import s from '../styles/toast-container.css'

class ToastContainer extends React.PureComponent<T.ToastContainerProps, T.ToastContainerState> {
  static defaultProps = {
    component: Toast,
  }

  timer: NodeJS.Timeout

  state: T.ToastContainerState = {
    status: 'entering',
  }

  start_timer = () => {
    this.timer = setTimeout(this.hide, this.props.timeout)
  }

  stop_timer = () => {
    if(!this.timer) return

    clearTimeout(this.timer)
  }

  hide = () => {
    this.stop_timer()
    this.props.onHide()
    this.setState({ status: 'exiting' }, () => {
      next_frame(() => this.setState({ status: 'exited' }))
    })
  }

  handle_transition_end = () => {
    this.props.onRemove()
  }

  componentDidMount() {
    next_frame(() => this.setState({ status: 'entered' }))
    this.start_timer()
  }

  render() {
    const { toastProps: toast_props, component: Component, position } = this.props
    const { status } = this.state
    const root_classname = classnames(
      s['toast-container'],
      status === 'entering' && s['toast-container--entering'],
      status === 'entered' && s['toast-container--entered'],
      status === 'exiting' && s['toast-container--exiting'],
      status === 'exited' && s['toast-container--exited'],
      position && s[`toast-container--${position}`],
    )
    const attributes: React.HTMLProps<HTMLDivElement> = {}

    if(status === 'entered') {
      attributes.onMouseEnter = this.stop_timer
      attributes.onMouseLeave = this.start_timer
    }

    if(status === 'exited') {
      attributes.onTransitionEnd = this.handle_transition_end
    }

    return (
      <div {...attributes} className={root_classname}>
        <Component {...toast_props} />
      </div>
    )
  }
}

export default ToastContainer
