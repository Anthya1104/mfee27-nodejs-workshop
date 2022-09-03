const express = require('express');
const router = express.Router();
// 引用資料庫
const pool = require('../utilis/db');
// 引用 bcrypt ( 密碼 hash )
const bcrypt = require('bcrypt');
// 驗證 -> 引用express validator
const { body, validationResult } = require('express-validator');

// 宣告 許多驗證中間件
const registerRules = [
  // 中間件 -> 檢查email
  body('email').isEmail().withMessage('請填寫正確Email格式'),
  // 中間件 -> 檢查password
  body('password').isLength({ min: 8 }).withMessage('密碼長度至少為8'),
  // 中間件 -> 檢查 password & confirmPassword 是否一致
  // 套件為提供 可以自己客製化
  body('confirmPassword')
    .custom((value, { req }) => {
      // value -> confirmPassword 的 value
      // 檢查 confirmPassword 是否等於 req.body.password ( password 的 value )
      return value === req.body.password;
    })
    .withMessage('兩次密碼輸入不一致'),
];

// 可以針對單一 router 使用 某些中間件
// router.use(express.json())

// 對單一 router 節點 使用
// 這個放法 -> 先進路由中間建件 ( .../quth/register ) -> 進 expresss.json() 中間件 -> request, response, next
// 中間的 express.json 甚至可以塞陣列 [express.json(), 第二個中間件]

router.post('/api/1.0/auth/register', express.json(), registerRules, async (req, res, next) => {
  // 確認資料有無收到
  console.log('register', req.body);
  // 資料驗證 (後端不能相信來自前端的資料)
  const validateResult = validationResult(req);
  console.log('validateResult', validateResult);
  if (!validateResult.isEmpty()) {
    // validateResult 不是 isEmpty -> error -> response error
    return res.status(400).json({ error: validateResult });
  }

  // 檢查 email 有沒有重複
  //  solution 1 : 交給 DB Index -> 一個 table 可設 2-3 個 index 可以把最常拿來比對的欄位設為 index (ex: email)
  //               把 email 欄位設為 UNIQUE -> 每次存入 DB 會自動檢查 重複會直接噴錯
  //               ref: ('../reference/DB_UNIQUE_AUTH')
  //               為保險 可以與 solution 2 同時使用 -> 可能產生 race condition

  //  solution 2: 自己檢查 -> 去資料庫撈 是否已存在

  // let result = await pool.execute('SELECT * FROM members WHERE email = ?', [req.body.email]);
  // //  result 資料結構 [data, fields]
  // //  members 資料位於 result[0]
  // let members = result[0];

  let [members] = await pool.execute('SELECT * FROM members WHERE email = ?', [req.body.email]);

  // refactor -> 段落感

  if (members.length > 0) {
    // 有重複 -> 註冊過
    // 如果有，回覆 400 跟錯誤訊息
    return res.status(400).json({ message: '該email已被使用' });
  } // 密碼要雜湊 hash
  let hashedPassword = await bcrypt.hash(req.body.password, 10);

  //  資料存到資料庫
  let result = await pool.execute('INSERT INTO members (email, password, name) VALUES (?, ?, ?);', [req.body.email, hashedPassword, req.body.name]);
  console.log('insert new member', result);
  //  回覆前端
  res.json({ message: 'OK' });

  // if else
  // if (members.length === 0) {
  //   // 密碼要雜湊 hash
  //   let hashedPassword = await bcrypt.hash(req.body.password, 10);

  //   //  資料存到資料庫
  //   let result = await pool.execute('INSERT INTO members (email, password, name) VALUES (?, ?, ?);', [req.body.email, hashedPassword, req.body.name]);
  //   console.log('insert new member', result);
  //   //  回覆前端
  //   res.json({ message: 'OK' });
  // } else {
  //   // 有重複 -> 註冊過
  //   // 如果有，回覆 400 跟錯誤訊息
  //   return res.status(400).json({ message: '該email已被使用' });
  // }
});

module.exports = router;
