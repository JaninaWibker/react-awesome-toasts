import * as React from 'react'

type ToastPosition = 'top-left' | 'bottom-left' | 'top-right' | 'bottom-right' | 'top-center' | 'bottom-center'

export type ReactProps = Record<string, any>

export interface ToastContext<T extends ReactProps = ReactProps> {
  show: (props: T) => void,
  hide: () => void
}

export interface ToastConsumerProps {
  children: (context: ToastContext) => React.ReactNode
}

export interface ToastProviderProps {
  timeout: number,
  component: React.ComponentType,
  position: ToastPosition,
  children: React.ReactNode
}

export interface ToastProviderQueueItem {
  props: ReactProps,
  id: string
}

export interface ToastProviderState {
  toasts: Array<ToastProviderQueueItem>
}

export interface ToastContainerProps<T extends ReactProps = ReactProps> {
  onHide: () => void,
  onRemove: () => void,
  toastProps: T,
  component: React.ComponentType,
  timeout: number,
  position: ToastPosition
}

export interface ToastContainerState {
  status: 'entering' | 'entered' | 'exiting' | 'exited'
}

type WithToastComponent = React.ComponentClass<{ toast: ToastContext } & ReactProps>

export type WithToast = (component: WithToastComponent) => (props: ReactProps) => React.ReactElement<any>
