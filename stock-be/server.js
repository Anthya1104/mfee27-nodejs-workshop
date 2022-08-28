const express = require('express');
// 初始化dotenv
require('dotenv').config();
const app = express();
const port = process.env.SERVER_PORT || 3001; //防呆

// 預設都是全部開放(*)
const cors = require('cors');
// const corOptions = {
//   // origin:['網址1','網址2',...其他網址]
//   origin: ['http://localhost:3000'], //指定只允許自己家的同源網站
// };
// app.use(cors(corOptions));
app.use(cors());

// solution 1
const mysql = require('mysql2');

let pool = mysql
  // 建立一個pool
  .createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // 設定pool連線上限
    connectionLimit: 10,
  })
  .promise();

// solution 2
// const mysql = require('mysql2/promises');

// let pool = mysql
//   // 建立一個pool
//   .createPool({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     // 設定pool連線上限
//     connectionLimit: 10,
//   })

// 設定試圖引擎 使用 pug (可自由替換喜歡的套件)
// 記得先npm i pug裝好
app.set('view engine', 'pug');
// 告訴 express 視圖在哪裡 -> views 指定為 views檔案夾
app.set('views', 'views');
// 測試 server side render
app.get('/ssr', (req, res, next) => {
  // views/index.pug
  // 可以設定要給的資料 傳進index.pug
  res.render('index', {
    stocks: ['台積電', '長榮', '聯發科'],
  });
});

// 一般的middleware
app.use((req, res, next) => {
  console.log('這是第 1 個中間件');
  let now = new Date();
  console.log(`有人來訪問 at ${now}`);
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
// 指定網址 -> 路由中間件
app.get('/', (req, res, next) => {
  // 連到首頁 如果成功 回傳 Hello Express
  res.send('Hello Express');
  console.log('這是首頁');
});

// 路由中間件
app.get('/test', (req, res, next) => {
  console.log('這裡是test');
  res.send('Hello Test');
});

// API
// 列出所有股票代碼 GET /stocks
app.get('/api/1.0/stocks', async (req, res, next) => {
  // 撈資料 -> 會撈出一個陣列 -> result[0] 是需要的資料 後面是一堆設定檔
  // let result = await pool.execute(`SELECT * FROM stocks`);
  // 陣列取值 ES6寫法
  let [data] = await pool.execute(`SELECT * FROM stocks`);
  console.log('result', data);
  // 寫死: 先測試這樣傳是正確的
  // res.json(['台積電', '聯發科', '長榮海']);
  res.json(data);
});

// 列出指定股票代碼的所有資料
// :react-route 的名字
app.get('/api/1.0/stocks/:stockId', async (req, res, next) => {
  const stockId = req.params.stockId;

  //  去資料庫撈資料
  let [data] = await pool.execute(`SELECT * FROM stock_prices WHERE stock_id=?`, [stockId]);

  //  把取得的資料回覆給前端

  // 開始寫中間前，先回 stockId 確定有成功包成API
  // res.json({ stockId });
  res.json(data);
});

app.use((req, res, next) => {
  // 但因為首頁 response 有指定網址: '/' 所以如果網址下的是其他網址 這裡會被執行到 e.g. localhost:3001/test (不存在的網址)
  // 如果前面完全沒有符合的網址 (404) 才會進來這裡
  // 利用這個特殊順序，可以把這個位置當成 404 使用(可以客製頁面)
  console.log('若找到網址 response已執行 這裡不會被執行到');
  console.log('在所有路由中間件下面');
  res.status(404).send('Not Found !!! @@');
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
