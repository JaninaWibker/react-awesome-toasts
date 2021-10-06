import ToastProviderImport from './ToastContext/toast-provider'
import ToastConsumerImport from './ToastContext/toast-consumer'
import withToastImport from './ToastContext/with-toast'
import {
  show_toast        as show_toast_import,
  show_simple_toast as show_simple_toast_import,
  show_full_toast   as show_full_toast_import,
  close_toast       as close_toast_import
} from './utilities/show-toast'

export const ToastProvider = ToastProviderImport
export const ToastConsumer = ToastConsumerImport
export const with_toast = withToastImport
export const show_simple_toast = show_simple_toast_import
export const show_full_toast = show_full_toast_import
export const show_toast = show_toast_import
export const close_taost = close_toast_import
