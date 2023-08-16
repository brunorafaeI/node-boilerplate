export enum RouteMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export interface RouteDefinition {
  method: RouteMethod
  path: string
  handler: (req: Request, res: Response) => void | Promise<void>
}

const ROUTE_METADATA_KEY = Symbol('route')

/**
 * Generates a route decorator function that adds routes to the metadata of a class.
 *
 * @param {string} path - The path of the route.
 * @param {RouteMethod} method - The HTTP method of the route.
 * @return {void}
 */
export const Route = <T>(path: string, method: RouteMethod) => {
  return (target: T, _: string, descriptor: PropertyDescriptor) => {
    try {
      const routes =
        Reflect.getMetadata(ROUTE_METADATA_KEY, target.constructor) || []

      const newRoutes = { ...routes, [path]: { method, handler: descriptor.value } }
      Reflect.defineMetadata(ROUTE_METADATA_KEY, newRoutes, target.constructor)
    } catch (error) {
      console.error(`Error in Route function: ${error}`)
      // Handle the error appropriately, e.g. by logging it or throwing a custom error
    }
  }
}

export const Get = (path: string) => Route(path, RouteMethod.GET)
export const Post = (path: string) => Route(path, RouteMethod.POST)
export const Delete = (path: string) => Route(path, RouteMethod.DELETE)
export const Put = (path: string) => Route(path, RouteMethod.PUT)

export const Controller = (routePrefix: string) => {
  return (constructor: any) => {
    const routes = [
      ...new Set<RouteDefinition>(Reflect.getMetadata('route', constructor)),
    ]

    routes.map(
      (route: RouteDefinition) => (route.path = routePrefix + route.path)
    )
    Reflect.defineMetadata('route', routes, constructor)
  }
}