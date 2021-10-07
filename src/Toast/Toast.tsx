import React from 'react'
import classnames from '../utilities/classnames'
import type { Props } from '../types/toast'
import s from '../styles/toast.css'

class Toast extends React.PureComponent<Props & { id: string }> {
  action_ref = React.createRef<HTMLButtonElement>()
  previous_focus: HTMLElement | null

  handle_action_click = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { on_action_click } = this.props

    if(on_action_click) on_action_click(this.props.id, e)
  }

  handle_action_blur = () => {
    this.restore_focus()
  }

  restore_focus = () => {
    if(document.activeElement !== this.action_ref.current) return

    if(this.previous_focus && this.previous_focus.focus) {
      const scroll_position = window.pageYOffset
      this.previous_focus.focus()
      window.scrollTo({ top: scroll_position })
    }

    this.previous_focus = null
  }

  componentDidMount() {
    const button = this.action_ref.current

    if(!button) return

    if(document.activeElement instanceof HTMLElement) {
      this.previous_focus = document.activeElement
    }

    button.focus()
  }

  componentWillUnmount() {
    this.restore_focus()
  }

  render() {
    const { text, action_text, aria_label, variant, classname } = this.props
    const root_classnames = classnames(s['root'], variant && s[`root--${variant}`], classname)

    return (
      <div className={root_classnames}>
        <span className={s['alert']} role="alert" aria-label={aria_label || (text as string /* if aria_label is undefined, text must be a string */)} />
        <span className={s['text']}>{text}</span>
        {action_text && (
          <button
            onClick={this.handle_action_click}
            onBlur={this.handle_action_blur}
            className={s['action']}
            ref={this.action_ref}
          >
            {action_text}
          </button>
        )}
      </div>
    )
  }
}

export default Toast
