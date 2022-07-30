//sum.js

function sum(n) {
    let numberSum = 0; 
    for(i = 0; i <= n; i++){
        
        numberSum += i;
       
    }
    return numberSum;

}

console.log(sum(1));
console.log(sum(3));
console.log(sum(10));

// solution 2
function sum2(n){
    return ((n+1)*n)/2;
}

console.log(sum2(1));
console.log(sum2(3));
console.log(sum2(10));

//solution 3 遞迴
function sum3(n){
    if(n === 1){
        return n;
    }
    return sum3(n-1)+n;
    //重複呼叫sum3
    //if n = 5 -> sum3(4)+5 -> sum3(3)+4+5 -> ..... -> 1+2+3+4+5
}
console.log(sum3(1));
console.log(sum3(3));
console.log(sum3(10));


// test:
// function sumType2(n){
//     let n;
//     if( n == 1 ){
//         console.log(1);
//     }else{
//         console.log(sum(n-1)+n)
//     }
// }

// sumType2(1);
// sumType2(3);
// sumType2(10);