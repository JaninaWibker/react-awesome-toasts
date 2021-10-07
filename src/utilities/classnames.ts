/**
 * given an array of strings (which might be undefined) filter out all falsy values and at last join them together with spaces
 * 
 * @example
 * ```
 * // assuming this.props.classname can be undefined, but is 'first-classname' in this case
 * // assuming some_condition evaluates to true, some_other_condition evaluates to false
 * classnames(this.props.classname, some_condition && 'some-classname', some_other_condition && 'last-classname')
 * // => 'first-classname some-classname'
 * ```
 */
const classnames = (...classnames: (string | undefined)[]) => classnames
  .filter(Boolean)
  .join(' ')

export default classnames
