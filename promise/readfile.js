const fs = require('fs');

fs.readFile('promise/test.txt', 'utf8', (err, data) => {
  if (err) {
    return console.error(err);
  }
  console.log(data);
});

//promise版本(老師版本)
let p = new Promise((resolve, reject) => {
  fs.readFile('promise/test.txt', 'utf8', (err, data) => {
    if (err) {
      return reject(err);
      //其實這邊有個判別式 if(status ===pending) promise status -> rejected
      //所以這邊單純是靠 改扁 status來使得底下resolve不被
      //但是其他行數如果有不同的函式還是會被執行
      //為了避免這種情況 這裡寫個return 讓函式直接結束 回傳一個值
    }
    //console.log('inside') //這行會被執行出來
    resolve(data); //其實這邊有個判別式 if(status ===pending) promise status -> fulfilled
  });
});
p.then((data) => {
  console.log(data);
}).catch((e) => {
  console.error(e);
  //這裡可以偷懶寫成:
  //.catch(console.error)
});

//await (老師版本)
//IIFE Immediatedly Invoked Function Expression
//立即執行函式
//e.g.

// (function f1() {})();
// (() => {})();

//等同於:

// let f2 = () => {};
// f2();

// async function doWork() {
//   try {
//     let data = await p;
//     console.log('await', data);
//   } catch (e) {
//     console.error(e);
//   }
// }

// doWork();

//立即執行寫法

(async () => {
  try {
    let data = await p;
    console.log('await', data);
  } catch (e) {
    console.error(e);
  }
})();
