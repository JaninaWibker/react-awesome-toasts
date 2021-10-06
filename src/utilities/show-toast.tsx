import type { ToastContext } from '../types/toast-context'
import type { Props } from '../types/toast'
import React from 'react'

const show_toast = (dispatch: ToastContext, payload: Props) => dispatch({
  type: 'show',
  payload: {
    on_action_click: id => dispatch({ type: 'remove-and-queue', payload: id }),
    ...payload
  }
})

const show_simple_toast = (dispatch: ToastContext, text: string, action_text: string) => dispatch({
  type: 'show',
  payload: {
    aria_label: text,
    text: text,
    action_text: action_text,
    on_action_click: id => dispatch({ type: 'remove-and-queue', payload: id }),
  }
})

const show_full_toast = (dispatch: ToastContext, text: string, action_text: string, variant: 'error' | undefined = undefined) => dispatch({
  type: 'show',
  payload: {
    aria_label: text,
    text: text.split(/(\n)/g).map(el => el === '\n' ? <br /> : el),
    action_text: action_text,
    on_action_click: id => dispatch({ type: 'remove-and-queue', payload: id }),
    ...(variant !== undefined ? { variant } : {})
  }
})

const close_toast = (dispatch: ToastContext) => (id: string) => dispatch({ type: 'remove-and-queue', payload: id })

export {
  show_toast,
  show_simple_toast,
  show_full_toast,
  close_toast
}