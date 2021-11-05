import { buildMessage, isPhoneNumber, ValidateBy } from 'class-validator';

// Don't validate if '' is received.
// See: https://github.com/typestack/class-validator/issues/232
export function IsPhoneNumberOrEmpty(region?: string): any {
  return ValidateBy({
    name: 'isPhoneNumberOrEmpty',
    constraints: [region],
    validator: {
      validate: (value, args) => {
        return value === '' || isPhoneNumber(value, args.constraints[0]);
      },
      defaultMessage: buildMessage(
        eachPrefix => eachPrefix + '$property must be a valid phone number'
      )
    }
  });
}
