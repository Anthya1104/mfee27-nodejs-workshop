//sum.js

function sum(n) {
  let numberSum = 0;
  for (i = 0; i <= n; i++) {
    numberSum += i;
  }
  return numberSum;
}

// console.log(sum(1));
// console.log(sum(3));
// console.log(sum(10));

// solution 2
function sum2(n) {
  return ((n + 1) * n) / 2;
}

// console.log(sum2(1));
// console.log(sum2(3));
// console.log(sum2(10));

//solution 3 遞迴
function sum3(n) {
  if (n === 1) {
    return n;
  }
  return sum3(n - 1) + n;
  //重複呼叫sum3
  //if n = 5 -> sum3(4)+5 -> sum3(3)+4+5 -> ..... -> 1+2+3+4+5
}
// console.log(sum3(1));
// console.log(sum3(3));
// console.log(sum3(10));

//function 4 reduce (待解))

//測試效能 測數字很大時
console.time('SUM1');
for (let i = 1; i <= 1000; i++) {
    sum(10000);
}
console.timeEnd('SUM1');

console.time('SUM2');
for (let i = 1; i <= 10000; i++) {
    sum2(1000);
}
console.timeEnd('SUM2');

console.time('SUM3');
for (let i = 1; i <= 10000; i++) {
    sum3(1000);
}
console.timeEnd('SUM3');