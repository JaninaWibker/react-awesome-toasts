const classnames = (...classnames: string[]) => classnames
  .filter(Boolean)
  .join(' ')

export default classnames
