const classnames = (...classnames: (string | undefined)[]) => classnames
  .filter(Boolean)
  .join(' ')

export default classnames
