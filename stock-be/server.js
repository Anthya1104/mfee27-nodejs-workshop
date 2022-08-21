const express = require('express');
// 初始化dotenv
require('dotenv').config();
const app = express();
const port = process.env.SERVER_PORT;

// app.[method]
// method: get, post, delete, put, patch......
app.get('/', (req, res) => {
  // 連到首頁 如果成功 回傳 Hello Express
  res.send('Hello Express');
});

// magic number -> 突然跑出一個數字不知道是什麼
// app.listen(3001, () => {
//   console.log('server start at 3001');
// });

// 把port變成變數 方便管理 減少bug
app.listen(port, () => {
  console.log(`server start at ${port}`);
});
