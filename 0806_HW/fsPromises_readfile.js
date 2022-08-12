const fs = require('fs/promises');

async function fileReading(path, encoding) {
  try {
    //這樣做會一直pending
    //error hint: await is not effective on this type
    //my guess: await is especially effected on promise function, but I declaired a 'console.log'function, which would be not working when using syntactic sugar

    // const fileData = fs.readFile(path, encoding);
    // const promise = console.log(fileData);

    // await promise;

    const promise = await fs.readFile(path, encoding);
    console.log(promise);
  } catch (err) {
    // When a request is aborted - err is an AbortError
    console.error(err);
  }
}

fileReading('0806_HW/test.txt', 'utf8');
fileReading('0806_HW/test2.txt', 'utf8');
fileReading('0806_HW/test3.txt', 'utf8');
