import { TransformOptions, Transform } from 'class-transformer';
import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';

const TransformPhoneNumber = (options?: TransformOptions) => Transform(({ value }) => {
  const phoneUtil = PhoneNumberUtil.getInstance();

  try {
    return phoneUtil.format(phoneUtil.parse(value), PhoneNumberFormat.E164);
  } catch {
    return value;
  }
}, options);

export default TransformPhoneNumber;
