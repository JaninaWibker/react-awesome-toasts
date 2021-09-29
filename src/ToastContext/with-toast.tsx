import * as React from 'react'
import ToastConsumer from './toast-consumer'

export type IReactComponent<P = any> =
    | React.ClassicComponentClass<P>
    | React.ComponentClass<P>
    | React.FunctionComponent<P>
    | React.ForwardRefExoticComponent<P>

export declare type Class<T = any> = new (...args: any[]) => T

export type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>

const withToastContext = <C extends IReactComponent<any>>(Component: C): C => (
  (props: any) => (
    <ToastConsumer>
      {context => <Component {...props} dispatch={context} />}
    </ToastConsumer>
  )) as any as C

type getProps<C> = C extends React.Component<infer T> ? T : never

/**
 * Removes the context-field from the props of a react component by wrapping it in a
 * functional component which passes all the props through. The props of the functional
 * component do not include the context-field.
 * This is an identity function, it does not do anything except mapping from props without
 * context to props with context in the type.
 */
const removeContextProp = <C extends React.Component<any>>(Component: Class<C>) =>
  (props: Omit<getProps<C>, 'dispatch'>) =>
    (<Component {...props} />)

const withToast = (Component: any) => removeContextProp(withToastContext(Component))

export default withToast