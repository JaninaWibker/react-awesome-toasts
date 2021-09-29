import type { MouseEvent } from 'react'

export type Props = {
  text: string,
  aria_label?: string,
  variant?: string
  action_text?: string,
  on_action_click?: (id: string, event: MouseEvent<HTMLButtonElement>) => any,
}
