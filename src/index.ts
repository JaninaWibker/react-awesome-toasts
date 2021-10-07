import ToastProviderImport from './ToastContext/toast-provider'
import ToastConsumerImport from './ToastContext/toast-consumer'
import withToastImport from './ToastContext/with-toast'
import {
  show_toast        as show_toast_import,
  show_simple_toast as show_simple_toast_import,
  show_full_toast   as show_full_toast_import,
  close_toast       as close_toast_import
} from './utilities/show-toast'

import type { 
  HideAction                as HideActionImport,
  RemoveAction              as RemoveActionImport,
  RemoveAndQueueAction      as RemoveAndQueueActionImport,
  ShowAction                as ShowActionImport,
  Action                    as ActionImport,
  ToastPosition             as ToastPositionImport,
  GenericToast              as GenericToastImport,
  GenericToastContext       as GenericToastContextImport,
  GenericWithToastComponent as GenericWithToastComponentImport,
  GenericWithToast          as GenericWithToastImport,
  Toast                     as ToastImport,
  ToastContext              as ToastContextImport,
  WithToast                 as WithToastImport,
} from './types/toast-context'
import type {
  Props as PropsImport
} from './types/toast'

export const ToastProvider     = ToastProviderImport
export const ToastConsumer     = ToastConsumerImport
export const with_toast        = withToastImport
export const show_simple_toast = show_simple_toast_import
export const show_full_toast   = show_full_toast_import
export const show_toast        = show_toast_import
export const close_taost       = close_toast_import

export type HideAction                   = HideActionImport
export type RemoveAction                 = RemoveActionImport
export type RemoveAndQueueAction         = RemoveAndQueueActionImport
export type ShowAction<T>                = ShowActionImport<T>
export type Action<T>                    = ActionImport<T>
export type ToastPosition                = ToastPositionImport
export type GenericToast<T>              = GenericToastImport<T>
export type GenericToastContext<T>       = GenericToastContextImport<T>
export type GenericWithToastComponent<T> = GenericWithToastComponentImport<T>
export type GenericWithToast<T>          = GenericWithToastImport<T>
export type Toast                        = ToastImport
export type ToastContext                 = ToastContextImport
export type WithToast                    = WithToastImport
export type Props                        = PropsImport
