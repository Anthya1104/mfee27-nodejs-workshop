const first = require('./first');
const second = require('./second');

console.log('I am index');

// let map = {};
// function require(module_name) {
//   if(map[module_name]) {
//     return map[module_name];
//   }
//   map[module_name] = load module_name;
// }

// 匯入物件 從物件中拿readFile出來用
const fs = require('fs');
fs.readFile;
// 一開始就只匯入readFile
const { readFile } = require('fs');
readFile();
