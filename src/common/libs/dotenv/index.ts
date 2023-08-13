type GetEnvType = string | number | boolean

export function getEnv<T extends GetEnvType>(
  key: string,
  fallback: T
): GetEnvType {
  return process.env[key] || fallback
}
