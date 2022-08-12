const fs = require('fs');

fs.readFile('promise/test.txt', 'utf8', (err, data) => {
  if (err) {
    return console.error(err);
  }
  console.log(data);
});
