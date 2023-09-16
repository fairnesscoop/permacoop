import { INestApplication } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { PATH_METADATA } from '@nestjs/common/constants';

const ROUTE_NAME_METADATA = '__route_name__';

export function WithName(routeName: string | Symbol): MethodDecorator {
  return (
    _target: object,
    _key: string | symbol,
    descriptor: TypedPropertyDescriptor<any>
  ) => {
    Reflect.defineMetadata(ROUTE_NAME_METADATA, routeName, descriptor.value);
    return descriptor;
  };
}

export type NamedRoute = {
  name: string;
  path: string;
};

export function getNamedRoutes(app: INestApplication): NamedRoute[] {
  const namedRoutes: NamedRoute[] = [];

  app
    .get(DiscoveryService)
    .getControllers()
    .forEach(controller => {
      const rootPath = Reflect.getMetadata(PATH_METADATA, controller.metatype);
      Object.getOwnPropertyNames(controller.instance.__proto__).forEach(
        methodName => {
          const method = controller.instance.__proto__[methodName];
          const name = Reflect.getMetadata(ROUTE_NAME_METADATA, method);
          if (name) {
            const path = Reflect.getMetadata(
              PATH_METADATA,
              controller.instance.__proto__[methodName]
            );
            namedRoutes.push({
              name,
              path: `/${rootPath}${path === '/' ? '' : path}`
            });
          }
        }
      );
    });

  return namedRoutes;
}
