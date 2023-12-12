export function numberFormat(number: number) {
  const { format } = new Intl.NumberFormat('en-us');
  return format(number);
}
