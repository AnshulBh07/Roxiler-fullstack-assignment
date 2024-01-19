export const formatCurrency = (number) => {
  var num = number.toString();
  let len = num.length;
  console.log(num);

  //   look for decimal present
  let index = -1;
  for (let i = 0; i < num.length; i++) {
    if (num[i] === ".") index = i;
  }

  let decimals = "00";
  if (index !== -1) {
    decimals = num.slice(index + 1, len);
    num = num.slice(0, num.length - (num.length - index));
  }

  if (num.length <= 3) return num;

  var ans = "";

  for (var k = num.length - 1; k >= num.length - 3; k--) {
    ans += num[k];
  }

  ans += ",";

  let count = 0;
  for (var i = num.length - 4; i >= 0; i--) {
    if (count === 2) {
      count = 0;
      ans += ",";
    }

    ans += num[i];
    count++;
  }

  //reverse the string
  var ans2 = "";
  for (var j = ans.length - 1; j >= 0; j--) {
    ans2 += ans[j];
  }
  return ans2 + "." + decimals;
};
