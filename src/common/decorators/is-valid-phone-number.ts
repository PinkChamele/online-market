import { ValidationOptions, registerDecorator } from 'class-validator';
import PhoneNumberConstraint from 'src/common/validators/is-phone-number';

export default function IsValidPhoneNumber(validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'isValidPhoneNumber',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: PhoneNumberConstraint,
    });
  };
}
