const express = require('express');
const router = express.Router();

// 可以針對單一 router 使用 某些中間件
// router.use(express.json())

// 對單一 router 節點 使用
router.port('/api/1.0/auth/register', express.json(), (req, res, next) => {
  // TODO: 確認資料有無收到
  // TODO: 檢查 email 有沒有重複
  // TODO: 如果有，回覆 400 跟錯誤訊息
  // TODO: 密碼要雜湊 hash
  // TODO: 資料存到資料庫
  // TODO: 回覆前端
  res.json({});
});

module.exports = router;
