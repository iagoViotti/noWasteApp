export default function handleDate(date: string): string {
  const dateObject = new Date(date);
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();
  return `${day < 9 ? `0${day + 1}` : (day + 1)}/${month < 10 ? `0${month}` : month}/${year}`;
};

