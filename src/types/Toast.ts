import type { MouseEvent } from 'react'

export type Props = {
  /**
   * A slight variation of the display style of the toast.
   * This adds a css classname to the element, but is however restricted to values specified in the `toast.css`-file of this project.
   */
   variant?: string,
   /**
    * The text of the action button.
    */
   action_text?: string,
   /**
    * The action to be taken when clicking the action button.
    */
   on_action_click?: (id: string, event: MouseEvent<HTMLButtonElement>) => any,
} & ({
  /**
   * Text to display in the toast, must be either a string or an array of strings or JSX elements (mixing both is explicitely allowed)
   * If an array is provided the `aria_label`-property must be specified.
   */
  text: string,
  /**
   * ARIA label for the toast element, this allows for better screen reader accessibility.
   * Defaults to the `text`-property, unless the text property is an array; then this property is strictly required.
   */
  aria_label?: string,
} | {
  /**
   * Text to display in the toast, must be either a string or an array of strings or JSX elements (mixing both is explicitely allowed)
   * If an array is provided the `aria_label`-property must be specified.
   */
  text: (string | JSX.Element)[],
  /**
   * ARIA label for the toast element, this allows for better screen reader accessibility.
   * Defaults to the `text`-property, unless the text property is an array; then this property is strictly required.
   */
  aria_label: string,
})
