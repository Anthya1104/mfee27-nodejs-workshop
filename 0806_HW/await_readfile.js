const fs = require('fs');

function fileReader(filePath, fileType) {
  return new Promise((resolve, reject) => {
    // reject('出錯啦讀不到');
    fs.readFile(filePath, fileType, (err, data) => {
      if (err) {
        return reject(console.error(`出錯啦:${err}`));
      }
      resolve(console.log(data));
    });
  });
}

async function fileReading() {
  try {
    let file1Result = await fileReader('0806_HW/test.txt', 'utf8');
    file1Result;
    let file2Result = await fileReader('0806_HW/test2.txt', 'utf8');
    file2Result;
    let file3Result = await fileReader('0806_HW/test3.txt', 'utf8');
    file3Result;
  } catch (err) {
    console.log(`出錯啦: ${err}`);
  }
}

fileReading();
