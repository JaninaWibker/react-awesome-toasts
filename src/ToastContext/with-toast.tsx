import * as React from 'react'
import ToastConsumer from './toast-consumer'

/**
 * Type for metaclasses extending a certain type T
 * 
 * Values of this type are classes that extend T
 */
declare type Class<T = any> = new (...args: any[]) => T

type IReactComponent<P = any> =
    | React.ClassicComponentClass<P>
    | React.ComponentClass<P>
    | React.FunctionComponent<P>
    | React.ForwardRefExoticComponent<P>

/**
 * Extract props from react component
 */
type getProps<C> = C extends React.Component<infer T> ? T : never

/**
 * Decorator for injecting a toast context into the props of a react component using a ToastConsumer.
 *
 * @remarks The class being decorated needs to have context: ToastContext in its prop types
 * to safely use this (from a type system perspective). Class decorators however cannot change
 * the outwards appearance of a class without changing how the actual class looks from the
 * inside as well. This means that this decorator cannot remove the context-field from the props.
 * To do this removeContextProp can be used, for this to work the class cannot be created and
 * exported at the same time as it needs to be wrapped in removeContextProp.
 * With this limitation you could also just use withToast which basically does all of this in
 * one step without needing the decorator at all.
 *
 * Another option is to mark context as optional, but this requires always narrowing the type
 * to a non-undefined value.
 */
const withToastContext = <C extends IReactComponent<any>>(Component: C): C => (
  (props: any) => (
    <ToastConsumer>
      {context => <Component {...props} dispatch={context} />}
    </ToastConsumer>
  )) as any as C

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

/**
 * Inject a toast context into a given component and omit the toast context from its list of properties returning a new component
 */
const withToast = (Component: any) => removeContextProp(withToastContext(Component))

export default withToast
