// function to check if the string from query parameter is a valid number or not
// time complexity O(n)
export const isNumber = (str) => {
  let n = str.length;

  for (let i = 0; i < n; i++) {
    if (isNaN(str[i])) return false;
  }

  return true;
};
