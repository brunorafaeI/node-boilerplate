import path from 'node:path'
import { Router } from 'express'

import { RouteDefinition } from '@/common/decorators/route'
import { KERNEL } from '@/infra/config/kernel'
import { scandir } from '@/common/helpers/scandir'

export default abstract class AppRouter {
  public static _route: Router = Router()

  static async bootstrap(): Promise<void> {
    const controllersPath = scandir(
      path.resolve(KERNEL.project_dir, 'src', 'app', 'modules')
    )

    for await (const file of controllersPath) {
      if (file.includes('controller')) {
        try {
          const controller = require(path.resolve(file))

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
    if (Reflect.hasMetadata('route', controller)) {
      const routes = [
        ...new Set<RouteDefinition>(Reflect.getMetadata('route', controller)),
      ]

      routes.forEach(({ method, path, handler }) => {
        ;(AppRouter._route as any)[method](path, handler)
      })
    }
  }
}
