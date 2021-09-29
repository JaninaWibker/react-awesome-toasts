import * as React from 'react'
import type { Props } from './toast'

export type ToastPosition = 'top-left' | 'bottom-left' | 'top-right' | 'bottom-right' | 'top-center' | 'bottom-center'

export type GenericToast<T> = {
  id: string,
  props: T
}

export type GenericToastContext<T> = React.Dispatch<{
  type: 'hide', payload: string
} | {
  type: 'show', payload: T
}>

export type GenericWithToastComponent<T> = React.ComponentClass<{ toast: ToastContext } & T>

export type GenericWithToast<T> = (component: GenericWithToastComponent<T>) => (props: T) => React.ReactElement<any>

export type Toast = GenericToast<Props>

export type ToastContext = GenericToastContext<Props>

export type WithToast = GenericWithToast<Props>
