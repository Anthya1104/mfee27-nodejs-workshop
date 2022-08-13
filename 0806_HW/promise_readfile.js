const fs = require('fs');

// solution1 好像沒改到
// function fileReader(filePath, fileType) {
//   return new Promise((resolve, reject) => {
//     // reject('出錯啦讀不到');

//     resolve(
//       fs.readFile(filePath, fileType, (data, err) => {
//         if (err) {
//           return console.error(err);
//         }
//         console.log(data);
//       })
//     );
//   });
// }
// fileReader('0806_HW/test.txt', 'utf8').catch((err) => {
//   console.error('在 promise 發生錯誤:', err);
// });

//solution2
function fileReader(filePath, fileType) {
  return new Promise((resolve, reject) => {
    // reject('出錯啦讀不到');
    fs.readFile(filePath, fileType, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
}

//先執行fileReader 最後得到data
fileReader('0806_HW/test.txt', 'utf8')
  .then((data) => {
    //用then把data丟出來做事
    console.log(data);
  })
  .catch((err) => {
    console.error('在 promise 發生錯誤:', err);
  });
