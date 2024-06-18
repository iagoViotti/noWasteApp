// verify date format is correct (yyyy-mm-dd)

export const verifyDate = (date: string): boolean => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(date);
}