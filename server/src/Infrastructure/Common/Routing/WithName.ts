export const ROUTE_NAME_METADATA = '__route_name__';

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
