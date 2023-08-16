type GetEnvType = string | boolean | number

/**
 * Retrieves the value of an environment variable specified by the given key. If the environment variable is not found,
 * the optional fallback value is returned instead.
 *
 * @param {string} key - The key of the environment variable to retrieve.
 * @param {T} [fallback] - An optional fallback value to return if the environment variable is not found.
 * @return {GetEnvType | undefined} - The value of the environment variable if found, or the fallback value if provided,
 * or undefined if neither is found.
 */
export function getEnv<T extends GetEnvType = string>(
  key: string,
  fallback?: T
): GetEnvType | undefined {
  return process.env[key] || fallback
}