let ary = [
  {
    id: 1,
    type: 'A',
    price: 100,
  },
  {
    id: 2,
    type: 'B',
    price: 200,
  },
  {
    id: 3,
    type: 'A',
    price: 150,
  },
];

//濾出type 是A

//array.filter
let result0 = ary.filter((item) => item.type === 'A');

console.log(result0);

//for loop

function aryFilter(ary) {
  let result = [];
  for (let i = 0; i < ary.length; i++) {
    if (ary[i].type === 'A') {
      result.push(ary[i]);
    }
  }
  return result;
}

console.log(aryFilter(ary));
