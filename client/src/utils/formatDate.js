export function formatDate(value, locale = "en-US", options) {
  const d = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat(locale, options).format(d);
}
