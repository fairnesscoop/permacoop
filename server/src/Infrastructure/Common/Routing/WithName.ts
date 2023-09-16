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

  const controllers = app.get(DiscoveryService).getControllers();

  controllers.forEach(controller => {
    const rootPath: string = Reflect.getMetadata(
      PATH_METADATA,
      controller.metatype
    );

    const methodNames = Object.getOwnPropertyNames(
      controller.instance.__proto__
    );

    methodNames.forEach(methodName => {
      const method = controller.instance.__proto__[methodName];
      const name: string | undefined = Reflect.getMetadata(
        ROUTE_NAME_METADATA,
        method
      );

      if (name) {
        const path: string = Reflect.getMetadata(PATH_METADATA, method);
        console.log(rootPath, path);
        namedRoutes.push({
          name,
          path: `/${rootPath}${path && path !== '/' ? '/' + path : ''}`
        });
      }
    });
  });

  return namedRoutes;
}
