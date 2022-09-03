const express = require('express');
const router = express.Router();
// 設定視圖引擎 使用 pug (可自由替換喜歡的套件)
// 記得先npm i pug裝好
router.set('view engine', 'pug');
// 告訴 express 視圖在哪裡 -> views 指定為 views檔案夾
router.set('views', __dirname + '/../views');
// 測試 server side render
router.get('/ssr', (req, res, next) => {
  // views/index.pug
  // 可以設定要給的資料 傳進index.pug
  res.render('index', {
    stocks: ['台積電', '長榮', '聯發科'],
  });
});
module.exports = router;
