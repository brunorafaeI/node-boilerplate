type GetEnvType = string | number | boolean

/**
 * Retrieves the value of an environment variable, or a fallback value if the environment variable is not set.
 *
 * @param {string} key - The name of the environment variable.
 * @param {T} fallback - The fallback value to use if the environment variable is not set.
 * @return {GetEnvType} The value of the environment variable, or the fallback value if the environment variable is not set.
 */
export function getEnv<T extends GetEnvType>(
  key: string,
  fallback: T
): GetEnvType {
  return process.env[key] || fallback
}
