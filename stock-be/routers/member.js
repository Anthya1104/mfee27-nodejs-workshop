const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

// 登入後才能使用
router.get('/', authMiddleware.checkLogin, (req, res, next) => {
  // 判斷會員是否登入 -> 改用 authMiddleware判斷 所以註解掉
  // if (!req.session.member) {
  //   // 如果 session 裡 沒有 member這筆資料 -> 未登入
  //   return res.status(401).json({ message: '尚未登入' });
  // }
  // solution 1 :
  // TODO: 根據 session 中儲存的會員 id ，撈資料庫，把資料庫裡會員的資料回覆給前端
  //        PROS: 資料準確
  //        CONS: 要一直去存取資料庫
  // TODO: 哪個會員?

  // solution 2 :
  // 其實甚至可以不撈資料庫 直接回覆 session 裡的資料
  // Note: 如果有提供修改會員資料功能，更新成功後，記得也要更新 session 資料
  //        PROS: 不用每次都打請求去讀資料庫
  //          CONS: 如果資料修改頻率很高 就要一直改
  res.json(req.session.member);
});

module.exports = router;
