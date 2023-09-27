export const capitalize = (v: string): string =>
  v.charAt(0).toUpperCase() + v.slice(1);

export const formatFullName = (obj: {
  firstName: string;
  lastName: string;
}): string => `${capitalize(obj.firstName)} ${capitalize(obj.lastName)}`;

export const htmlToText = (trustedHtml: string): string => {
  // See: https://stackoverflow.com/a/5002161
  return trustedHtml
    .replace(/<br\s?\\?>/g, '\n')
    .replace(/<\/?[^>]+(>|$)/g, '');
};
