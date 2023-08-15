export namespace StringUtil {
  /**
   * Converts a value to a boolean.
   *
   * @param {any} value - The value to be converted.
   * @return {boolean} - The converted boolean value.
   */
  export function toBoolean(value?: any): boolean {
    if (typeof value === 'string') value = value.trim().toLowerCase()

    switch (value) {
      case true:
      case false:
        return value

      case 'true':
        return true

      case 'false':
        return false

      default:
        return !!value
    }
  }

  /**
   * Converts a value to a floating-point number.
   *
   * @param {any} value - The value to convert.
   * @return {number | undefined} - The converted floating-point number, or undefined if the conversion fails.
   */
  export function toFloat(value?: any): number | undefined {
    const parsed = typeof value === 'number' ? value : parseFloat(String(value))
    return !isNaN(parsed) ? parsed : undefined
  }

  /**
   * Converts a value to a string if it is of type string, otherwise returns undefined.
   *
   * @param {any} value - The value to be converted.
   * @return {string | undefined} The converted string value or undefined.
   */
  export function toString(value?: any): string | undefined {
    return typeof value === 'string' ? value : undefined
  }
}
