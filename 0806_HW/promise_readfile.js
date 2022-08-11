const fs = require('fs');

function fileReader(filePath, fileType) {
  return new Promise((resolve, reject) => {
    // reject('出錯啦讀不到');

    resolve(
      fs.readFile(filePath, fileType, (data, err) => {
        if (err) {
          return console.error(err);
        }
        console.log(data);
      })
    );
  });
}
fileReader('0806_HW/test.txt', 'utf8').catch((err) => {
  console.error('在 promise 發生錯誤:', err);
});
