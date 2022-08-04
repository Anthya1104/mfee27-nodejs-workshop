let kvArray = [{key: 1, value: 10},
    {key: 2, value: 20},
    {key: 3, value: 30}];

//重新map一個陣列 讓key值變成key value值變成value
// newAry = [
//     { '1': 10}, { '2': 20 }, { '3': 30} 
// ]    

//array.map

let reformattedArray = kvArray.map(function(obj) {
let rObj = {};
rObj[obj.key] = obj.value;
return rObj;
});

console.log(reformattedArray)

//for loop
function aryMap(ary){
    let result = []
    let rObj = {}
    for ( i = 0; i < ary.length; i++){
        rObj[ary[i].key] = ary[i].value
        
        
    }result.push(rObj)
    return result
}
console.log(aryMap(kvArray))

//待解問題:
// 目前跑出的結果 kvArray.map :
// [ { '1': 10 }, { '2': 20 }, { '3': 30 } ]

// 用for loop跑出的是 :
// [ { '1': 10, '2': 20, '3': 30 } ]
// 在迴圈內所有object會被鋪平放在同一個array裡，如果想做到只在第i個子陣列裡放{ key[i] : value[i]} 該怎麼實現


// test
// function aryMap2(ary){
//     let result = []
//     let rObj = {}
//     for ( i = 0; i < ary.length; i++){
//         for ( j = 0; j <= i + 1; j++){
//             if( j = i){
//                 rObj[ary[j-1].key] = ary[j-1].value
//             }
            
//         }result[i] = rObj[ary[j-1].key]
//     }
//     return result
// }

// console.log(aryMap2(kvArray))