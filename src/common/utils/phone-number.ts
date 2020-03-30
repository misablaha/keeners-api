import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';

const phoneUtil = PhoneNumberUtil.getInstance();

export { PhoneNumberFormat };

export function formatPhoneNumber(number: string, format: PhoneNumberFormat = PhoneNumberFormat.INTERNATIONAL): string {
  if (!number) return number;
  const phoneNumber = phoneUtil.parseAndKeepRawInput(number, 'CZ');
  return phoneUtil.format(phoneNumber, format);
}
