const array1 = [1, 2, 3, 4];

//想要結果:
// 0 + 1 + 2 + 3 + 4

//array.reduce
let initialValue = 0;
let sumWithInitial = array1.reduce(
  (previousValue, currentValue) => previousValue + currentValue,
  initialValue
);

console.log(sumWithInitial);
// expected output: 10

//for loop
function arrayReduce(ary){
    let result = 0
    for( i = 0; i < ary.length; i++){
        result += ary[i]
    }
    return result
}

console.log(arrayReduce(array1))
// expected output : 10