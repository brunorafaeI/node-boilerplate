// export const Body = (target: any, propertyKey: string) => {
//   return (target: any, propertyKey: string, parameterIndex: number) => {
//     const bodyParameters = Reflect.getMetadata(
//       'body:parameters',
//       target,
//       propertyKey
//     )
//     const existingBodyParameters: number[] =
//       Reflect.getOwnMetadata('body:parameters', target, propertyKey) || []
//     existingBodyParameters.push(bodyParameters)
//     Reflect.defineMetadata(
//       'body:parameters',
//       existingBodyParameters,
//       target,
//       propertyKey
//     )
//   }
// }

export const Body = () => {
  return (target: any, propertyKey: string, parameterIndex: number) => {
    const existingBodyParameters: number[] =
      Reflect.getOwnMetadata('body:parameters', target, propertyKey) || []
    existingBodyParameters.push(parameterIndex)
    Reflect.defineMetadata(
      'body:parameters',
      existingBodyParameters,
      target,
      propertyKey
    )
  }
}
