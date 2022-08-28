// router: mini app ( definitiaon in express)

const express = require('express');
// 習慣用法
const router = express.Router();

const pool = require('../utilis/db');

// API
// 列出所有股票代碼 GET /stocks
router.get('/', async (req, res, next) => {
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
router.get('/:stockId', async (req, res, next) => {
  const stockId = req.params.stockId;

  //  去資料庫撈資料
  // 撈出全部資料
  // let [Data] = await pool.execute(`SELECT * FROM stock_prices WHERE stock_id=?`, [stockId]);

  // 分頁寫法
  // 透過 query string 取得目前要第幾頁資料
  // 如果沒有設定，預設要第一頁的資料
  let page = req.query.page || 1;
  // 每一頁五筆資料
  let perPage = 6;

  // 取得總筆數

  let [total] = await pool.execute(`SELECT COUNT(*) AS total FROM stock_prices WHERE stock_id=?`, [stockId]);
  total = total[0].total;

  // 計算總頁數 Math.ceil
  let lastPage = Math.ceil(total / perPage);

  // 計算 offset
  const offset = perPage * (page - 1);

  // 根據 perPage 及 offset 去取得資料
  // SELECT * FROM stock_prices WHERE stock_id ORDER BY date LIMIT 限制一次抓幾筆 OFFSET 跳過幾筆
  let [data] = await pool.execute('SELECT * FROM stock_prices WHERE stock_id=? ORDER BY date LIMIT ? OFFSET ?', [stockId, perPage, offset]);

  //  把取得的資料回覆給前端

  res.json({
    pagination: {
      total, // 總共有幾筆
      perPage, // 一頁有幾筆
      page, // 目前在第幾頁
      lastPage, // 總頁數
    },
    data,
  });

  // 開始寫中間前，先回 stockId 確定有成功包成API
  // res.json({ stockId });
  // res.json(data);
});

module.exports = router;
