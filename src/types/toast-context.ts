import * as React from 'react'
import type { Props } from './toast'

export type ToastPosition = 'top-left' | 'bottom-left' | 'top-right' | 'bottom-right' | 'top-center' | 'bottom-center'

export type GenericToast<T> = {
  id: string,
  props: T
}

export type HideAction = { type: 'hide', payload: string }
export type RemoveAction = { type: 'remove', payload: string }
export type RemoveAndQueueAction = { type: 'remove-and-queue', payload: string }
export type ShowAction<T> = { type: 'show', payload: T }

export type Action<T> = HideAction | RemoveAction | RemoveAndQueueAction | ShowAction<T>

export type GenericToastContext<T> = React.Dispatch<Action<T>>

export type GenericWithToastComponent<T> = React.ComponentClass<{ toast: ToastContext } & T>

export type GenericWithToast<T> = (component: GenericWithToastComponent<T>) => (props: T) => React.ReactElement<any>

export type Toast = GenericToast<Props>

export type ToastContext = GenericToastContext<Props>

export type WithToast = GenericWithToast<Props>
