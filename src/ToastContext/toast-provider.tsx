import React from 'react'
import id from '../utilities/id'
import ToastContainer from './toast-container'
import type { ToastPosition, GenericToast, Toast, Action } from '../types/toast-context'
import ToastComponent from '../Toast'

const DO_LOGGING = true

type ToastProviderProps<T> = {
  timeout?: number,
  position?: ToastPosition,
  children: React.ReactNode,
  component?: React.ComponentType<T & { id: string }>
}

const { Consumer, Provider } = React.createContext({})

type State<T> = { queue: GenericToast<T>[], toasts: GenericToast<T>[] }

type Reducer<T> = (state: State<T>, action: Action<T>) => State<T>

const reducer = <T extends any>(state: State<T>, action: Action<T>): State<T> => {

  const add = <T extends any>(arr: T[], item: T | undefined): T[] => item !== undefined ? [...arr, item] : arr
  const log = (action: Action<T>, id: string, do_end = true) => {
    if(DO_LOGGING) {
      console.groupCollapsed(`[q: ${state.queue.length}, t: ${state.toasts.length}]: ${action.type} ${id}`)
      console.log('queue', [...state.queue])
      console.log('toasts', [...state.toasts])
      console.log(action.type, action.payload)
      if(do_end) { console.groupEnd() }
    }
  }
  const end_log = () => { if(DO_LOGGING) { console.groupEnd() } }
  const filter = (arr: GenericToast<T>[], exclude_id: GenericToast<T>['id']) => arr.filter(toast => toast.id !== exclude_id)

  switch(action.type) {
    case 'show': {

      const new_id = id() // TODO: how is id generation done? is using random here a good idea?
      log(action, new_id)
      const new_toast = { id: new_id, props: action.payload }

      return state.toasts.length === 0
        ? { queue: state.queue, toasts: add(state.toasts, new_toast) }
        : { queue: add(state.queue, new_toast), toasts: state.toasts }

    }
    case 'hide': {

      log(action, action.payload)
      const new_toast = state.queue.pop()
      return {
        queue: state.queue,
        toasts: add(state.toasts, new_toast)
      }

    }
    case 'remove': {

      log(action, action.payload, false)
      const filtered_toasts = filter(state.toasts, action.payload)
      if(filtered_toasts.length === state.toasts.length) {
        console.error(`couldn't find toast ${action.payload}`)
      }
      end_log()
      return {
        queue: state.queue,
        toasts: filtered_toasts
      }

    }
    case 'remove-and-queue': {

      log(action, action.payload, false)
      const found_in_toasts = state.toasts.find(toast => toast.id === action.payload)

      if(found_in_toasts) {
        const new_toast = state.queue.pop()
        const filtered_toasts = filter(state.toasts, action.payload)
        if(filtered_toasts.length === state.toasts.length) {
          console.error(`couldn't find toast ${action.payload}`)
        }
        end_log()
        return {
          queue: state.queue,
          toasts: add(filtered_toasts, new_toast)
        }
      } else {
        end_log()
        return {
          queue: filter(state.queue, action.payload),
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
