export const handleDate = (date: string): string => {
  const dateObject = new Date(date);
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();
  return `${day < 10 ? `0${day}` : day}/${month < 10 ? `0${month}` : month}/${year}`;
};

