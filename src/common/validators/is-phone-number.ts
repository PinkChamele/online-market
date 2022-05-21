import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { PhoneNumberUtil } from 'google-libphonenumber';

@ValidatorConstraint({ async: false })
export default class PhoneNumberConstraint implements ValidatorConstraintInterface {
  private phoneUtil = PhoneNumberUtil.getInstance();

  validate(propertyValue: string) {
    try {
      const phoneNumber = this.phoneUtil.parseAndKeepRawInput(propertyValue);

      return this.phoneUtil.isValidNumber(phoneNumber);
    } catch {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a valid phone number`;
  }
}
