import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments
} from 'class-validator';

export const DateGreaterOrEqualThan = (property: string) => {
  return (object: any, propertyName: string) => {
    const options: ValidationOptions = {
      message: `${propertyName} should be greater or equal than ${property}`
    };
    registerDecorator({
      name: 'dateGreaterOrEqualThan',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];

          return new Date(value) >= new Date(relatedValue);
        }
      }
    });
  };
};
