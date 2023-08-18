import path from 'node:path'
import { Router } from 'express'

import { ROUTE_METADATA_KEY, RouteDefinition } from '@/common/decorators/route'
import { KERNEL } from '@/infra/config/kernel'
import { scandir } from '@/common/helpers/scandir'

export default abstract class AppRouter {
  public static _route: Router = Router()
  static async bootstrap(): Promise<void> {
    const controllersPath = path.resolve(
      KERNEL.project_dir,
      'src',
      'app',
      'modules'
    )

    for await (const file of scandir(controllersPath)) {
      if (file.includes('controller')) {
        try {
          const controller = require(file)

          if (controller) {
            if ('default' in controller) {
              AppRouter.register(controller.default)
            } else {
              AppRouter.register(
                Object.values(controller).find((obj) => obj instanceof Function)
              )
            }
          }
        } catch (error) {
          console.error(error.message)
        }
      }
    }
  }
  static register(controller: any): void {
    if (Reflect.hasMetadata(ROUTE_METADATA_KEY, controller)) {
      const routes = Reflect.getMetadata(ROUTE_METADATA_KEY, controller)

      for (const [path, route] of Object.entries<RouteDefinition>(routes)) {
        ;(AppRouter._route as any)[route.method](path, route.handler)
      }
    }
  }
}
