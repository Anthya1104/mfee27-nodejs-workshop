const fs = require('fs');
const util = require('util');

//自己包的Promise
// let readFileP = new Promise((resolve, reject) => {
//   //error-first callback -> 錯誤放前面的callback
//   fs.readFile('text.txt', 'utf-8', (err, data) => {
//     if (err) {
//       return reject(err);
//     }
//     resolve(data);
//   });
// });

// 使用util
let readFileP = util.promisify(fs.readFile);
readFileP('test.txt', 'utf-8')
  .then((data) => {
    console.log(data);
  })
  .catch(console.error);
