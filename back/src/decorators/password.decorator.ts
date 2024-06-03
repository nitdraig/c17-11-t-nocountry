import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { password } from '@Constants/regex';

/**
 *
 * @description Validate if it contains at least one uppercase letter, at least one lowercase letter, at least one number, at least one special character and is between 8 to 16 characters
 *
 */
export function IsPassword(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPassword',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        validate(value: any, args: ValidationArguments) {
          return password.test(value);
        },
      },
    });
  };
}
