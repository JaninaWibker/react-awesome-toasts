import React from 'react'
import ToastContainer from './toast-container'
import ToastComponent from '../Toast'
import reducer from './reducer'
import type { ToastPosition, Toast } from '../types/toast-context'
import type { State, Reducer } from './reducer'

type ToastProviderProps<T> = {
  timeout?: number,
  position?: ToastPosition,
  children: React.ReactNode,
  component?: React.ComponentType<T & { id: string }>,
  skip_animation?: boolean,
  container_classname?: string
}

const { Consumer, Provider } = React.createContext({})

const ToastProvider = <T extends any = Toast['props']>(unmerged_props: ToastProviderProps<T>) => {

  const props = Object.assign({}, {
    timeout: 4500,
    position: 'bottom-left',
    component: ToastComponent,
    skip_animation: false,
    container_classname: undefined
  }, unmerged_props)

  const [state, dispatch] = React.useReducer(reducer as Reducer<T>, { queue: [], toasts: [] } as State<T>, () => ({ queue: [], toasts: [] } as State<T>))

  return (
    <Provider value={dispatch}>
      {props.children}

      {state.toasts.map(toast => (
        <ToastContainer
          component={props.component}
          toast={toast}
          key={toast.id}
          dispatch={dispatch}
          timeout={props.timeout}
          position={props.position}
          skip_animation={props.skip_animation}
          container_classname={props.container_classname}
        />
      ))}
    </Provider>
  )
}

export const ContextConsumer = Consumer
export default ToastProvider
