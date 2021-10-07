import React from 'react'
import classnames from '../utilities/classnames'
import next_frame from '../utilities/next-frame'
import type { GenericToast, GenericToastContext, ToastPosition } from '../types/toast-context'
import s from '../styles/toast-container.css'


type ToastContainerState = {
  status: 'entering' | 'entered' | 'exiting' | 'exited'
}

type ToastContainerProps<T>= {
  dispatch: GenericToastContext<T>,
  toast: GenericToast<T>,
  timeout: number,
  position: ToastPosition,
  component: React.ComponentType<T & { id: string }>
  skip_animation: boolean,
  container_classname: string | undefined
}

class ToastContainer<T> extends React.PureComponent<ToastContainerProps<T>, ToastContainerState> {
  timer: NodeJS.Timeout

  state: ToastContainerState = {
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

    if(this.props.skip_animation) {
      this.setState({ status: 'exited' }, () => this.props.dispatch({ type: 'remove-and-queue', payload: this.props.toast.id }))
      return
    }

    this.props.dispatch({ type: 'hide', payload: this.props.toast.id })
    this.setState({ status: 'exiting' }, () => {
      next_frame(() => this.setState({ status: 'exited' }))
    })
  }

  handle_transition_end = () => {
    if(this.props.skip_animation) {
      return
    }

    this.props.dispatch({ type: 'remove', payload: this.props.toast.id })
  }

  componentDidMount() {
    next_frame(() => this.setState({ status: 'entered' }))
    this.start_timer()
  }

  render() {
    const { toast, position, component: Component, container_classname } = this.props
    const { status } = this.state
    
    const root_classname = classnames(
      s['toast-container'],
      status === 'entering' && s['toast-container--entering'],
      status === 'entered' && s['toast-container--entered'],
      status === 'exiting' && s['toast-container--exiting'],
      status === 'exited' && s['toast-container--exited'],
      position && s[`toast-container--${position}`],
      container_classname
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
        <Component {...toast.props} id={toast.id} />
      </div>
    )
  }
}

export default ToastContainer
