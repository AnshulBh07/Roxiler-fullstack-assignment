export const getFormattedDate = (str) => {
  let x = str.split("T");
  let y = x[0].split("-");

  let date = y[2] + "/" + y[1] + "/" + y[0];
  return date;
};
