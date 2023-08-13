export default {
  toBoolean: (value?: any): boolean => {
    if (typeof value === 'string') value = value.toLowerCase()

    return (
      typeof value === 'boolean' ||
      value === 'true' ||
      !(value === 'false') ||
      !(typeof value === 'undefined')
    )
  },

  toFloat: (value?: any): number | undefined => {
    const parsed = typeof value === 'number' ? value : parseFloat(String(value))
    return !isNaN(parsed) ? parsed : undefined
  },

  toString: (value?: any): string | undefined => {
    return typeof value === 'string' ? value : undefined
  },
}
