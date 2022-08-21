const express = require('express');
// 初始化dotenv
require('dotenv').config();
const app = express();
const port = process.env.SERVER_PORT;

// 一般的middleware
app.use((req, res, next) => {
  console.log('這是第 1 個中間件');
  next();
  // res.send('ABC'); //如果在這裡就send 請求會在這裡就結束 不會連到首頁
});

// app.use((req, res, next) => {
//   console.log('這是第 2 個中間件');
//   // next();
//   // 如果中間件沒有結束，也沒有呼叫next()或做其他處理 fetch會卡在這裡 直到逾時
// });

// app.[method]
// method: get, post, delete, put, patch......
app.get('/', (req, res, next) => {
  // 連到首頁 如果成功 回傳 Hello Express
  res.send('Hello Express');
  console.log('這是首頁');
});

app.use((req, res, next) => {
  // 但因為首頁 response 有指定網址: '/' 所以如果網址下的是其他網址 這裡會被執行到 e.g. localhost:3001/test (不存在的網址)
  console.log('response已執行 這裡不會被執行到');
  next();
  // res.send('ABC'); //如果在這裡就send 請求會在這裡就結束 不會連到首頁
});

// magic number -> 突然跑出一個數字不知道是什麼
// app.listen(3001, () => {
//   console.log('server start at 3001');
// });

// 把port變成變數 方便管理 減少bug
app.listen(port, () => {
  console.log(`server start at ${port}`);
});
