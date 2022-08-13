const fs = require('fs');

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

async function filePrinting(filePath, fileType) {
  try {
    let result = await fileReader(filePath, fileType);
    console.log(result);
  } catch (err) {
    console.log(`出錯啦: ${err}`);
  }
}
filePrinting('0806_HW/test.txt', 'utf8');
filePrinting('0806_HW/test2.txt', 'utf8');
filePrinting('0806_HW/test3.txt', 'utf8');
