const fs = require('fs/promises');
function fileReading(fileName,fileType){
try {
  const promise = fs.readFile(fileName, fileType);

  await promise;
} catch (err) {
  // When a request is aborted - err is an AbortError
  console.error(err);
}
}

