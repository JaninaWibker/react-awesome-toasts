import React from 'react'
import id from '../utilities/id'
import ToastContainer from './toast-container'
import type { ToastPosition, GenericToast, Toast } from '../types/toast-context'
import ToastComponent from '../Toast'

type ToastProviderProps<T> = {
  timeout?: number,
  position?: ToastPosition,
  children: React.ReactNode,
  component?: React.ComponentType<T & { id: string }>
}

const { Consumer, Provider } = React.createContext({})

type HideAction = { type: 'hide', payload: string }
type ShowAction<T> = { type: 'show', payload: T }

type Action<T> = HideAction | ShowAction<T>

type State<T> = { queue: GenericToast<T>[], toasts: GenericToast<T>[] }

type Reducer<T> = (state: State<T>, action: Action<T>) => State<T>

const reducer = <T extends any>(state: State<T>, action: Action<T>): State<T> => {
  switch(action.type) {
    case 'show': {
      const new_toast = { id: id(), props: action.payload } // TODO: how is id generatino done? is using random here a good idea?

      if(state.toasts.length === 0) {
        return { queue: state.queue, toasts: [...state.toasts, new_toast] }
      } else {
        return { queue: [...state.queue, new_toast], toasts: state.toasts }
      }

    }
    case 'hide': {

      const found_in_toasts = state.toasts.find(toast => toast.id === action.payload)

      if(found_in_toasts) {
        const new_toast = state.queue.pop()
        const filtered_toasts = state.toasts.filter(toast => toast.id !== action.payload)
        return {
          queue: state.queue,
          toasts: new_toast !== undefined
            ? [...filtered_toasts, new_toast]
            : filtered_toasts
        }
      } else {
        return {
          queue: state.queue.filter(toast => toast.id !== action.payload),
          toasts: state.toasts
        }
      }
    }
  }
}

const ToastProvider = <T extends any = Toast['props']>(unmerged_props: ToastProviderProps<T>) => {

  const props = Object.assign({}, {
    timeout: 4500,
    position: 'bottom-left',
    component: ToastComponent
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
        />
      ))}
    </Provider>
  )
}


export const ContextConsumer = Consumer
export default ToastProvider
