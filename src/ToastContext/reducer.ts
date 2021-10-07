import id from '../utilities/id'
import type { GenericToast, Action } from '../types/toast-context'

const DO_LOGGING = true

export type State<T> = { queue: GenericToast<T>[], toasts: GenericToast<T>[] }

export type Reducer<T> = (state: State<T>, action: Action<T>) => State<T>

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

export default reducer
