// Inspired by: https://github.com/nestjs/nest/blob/cb2af8a3723272bcbacde44dcaadab66a7ec8b7c/packages/core/router/route-alias-resolver.ts
import { Injectable } from '@nestjs/common';
import { PATH_METADATA } from '@nestjs/common/constants';
import { isObject } from '@nestjs/common/utils/shared.utils';
import { DiscoveryService } from '@nestjs/core';
import { ROUTE_NAME_METADATA } from './WithName';

@Injectable()
export class RouteNameResolver {
  private readonly nameMap: Map<string, string[]>;

  constructor(discoveryService: DiscoveryService) {
    this.nameMap = new Map();
    this.init(discoveryService);
  }

  private init(discoveryService: DiscoveryService) {
    const controllers = discoveryService.getControllers();

    controllers.forEach(controller => {
      const basePath: string = Reflect.getMetadata(
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
          this.register(name, basePath, [path]);
        }
      });
    });
  }

  public register(name: string, basePath: string, path: string[]) {
    if (this.nameMap.has(name)) {
      throw new Error(`Conflict ${name} already registered`);
    }
    this.nameMap.set(name, this.createPath(basePath, path));
  }

  public resolve(name: string, params?: object): string {
    if (!this.nameMap.has(name)) {
      throw new Error(`Not Found: ${name} not registered`);
    }

    const path = this.nameMap.get(name).reduce((path, part) => {
      if (part.startsWith(':') && isObject(params)) {
        const paramValue = params[part.replace(':', '')];
        return path + '/' + (paramValue !== undefined ? paramValue : part);
      }
      return part ? path + '/' + part : path;
    }, '');

    return path ? path : '/';
  }

  public getName(path: string): string | null {
    const parts = this.splitPath([path]);

    const entries = Array.from(this.nameMap.entries());
    entries.sort(
      ([, patternA], [, patternB]) =>
        this.splitPath(patternB).length - this.splitPath(patternA).length
    );

    const matches = entries.filter(([, pattern]) => {
      const routeParts = this.splitPath(pattern);

      if (routeParts.length !== parts.length) {
        return false;
      }

      for (let index = 0; index < parts.length; index++) {
        const partLeft = parts[index];
        const partRight = routeParts[index];
        if (partLeft !== partRight && !partRight.startsWith(':')) {
          return false;
        }
      }

      return true;
    });

    if (matches.length === 0) {
      return null;
    }

    return matches[0][0];
  }

  private createPath(basePath: string, path: string[]): string[] {
    const base = basePath ? [this.stripSlashes(basePath)] : [];
    return base.concat(this.splitPath(path));
  }

  private splitPath(path: string[]): string[] {
    const pathParts = [];
    path.forEach(part => {
      part.split('/').forEach(partial => {
        partial && pathParts.push(this.stripSlashes(partial));
      });
    });
    return pathParts;
  }

  private stripSlashes(str: string) {
    return str.replace(/^\/?(.*)\/?$/, '$1');
  }
}
