export function deltaTimeInDays(date: string) {
  const now = new Date();
  const expirationDate = new Date(date);
  const difference = expirationDate.getTime() - now.getTime();
  const days = Math.ceil(difference / (1000 * 3600 * 24));
  return days;
}
