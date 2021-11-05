import { buildMessage, isEmail, ValidateBy } from 'class-validator';

// Don't validate if '' is received.
// See: https://github.com/typestack/class-validator/issues/232
export function IsEmailOrEmpty(): any {
  return ValidateBy({
    name: 'isEmailOrEmpty',
    validator: {
      validate: value => {
        return value === '' || isEmail(value);
      },
      defaultMessage: buildMessage(
        eachPrefix => eachPrefix + '$property must be an email'
      )
    }
  });
}
