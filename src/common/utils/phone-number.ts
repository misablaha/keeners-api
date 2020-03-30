import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';

const phoneUtil = PhoneNumberUtil.getInstance();

export function formatPhoneNumber(number: string): string {
  if (!number) return number;
  const phoneNumber = phoneUtil.parseAndKeepRawInput(number, 'CZ');
  return phoneUtil.format(phoneNumber, PhoneNumberFormat.INTERNATIONAL);
}
