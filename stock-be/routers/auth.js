const express = require('express');
const router = express.Router();
// 引用資料庫
const pool = require('../utilis/db');
// 引用 bcrypt ( 密碼 hash )
const bcrypt = require('bcrypt');

// 可以針對單一 router 使用 某些中間件
// router.use(express.json())

// 對單一 router 節點 使用
// 這個放法 -> 先進路由中間建件 ( .../quth/register ) -> 進 expresss.json() 中間件 -> request, response, next
// 中間的 express.json 甚至可以塞陣列 [express.json(), 第二個中間件]

router.post('/api/1.0/auth/register', express.json(), async (req, res, next) => {
  // 確認資料有無收到
  console.log('register', req.body);
  // TODO: 資料驗證 (後端不能相信來自前端的資料)

  // 檢查 email 有沒有重複
  //  solution 1 : 交給 DB Index -> 一個 table 可設 2-3 個 index 可以把最常拿來比對的欄位設為 index (ex: email)
  //               把 email 欄位設為 UNIQUE -> 每次存入 DB 會自動檢查 重複會直接噴錯
  //               ref: ('../reference/DB_UNIQUE_AUTH')

  //  solution 2: 自己檢查 -> 去資料庫撈 是否已存在

  // let result = await pool.execute('SELECT * FROM members WHERE email = ?', [req.body.email]);
  // //  result 資料結構 [data, fields]
  // //  members 資料位於 result[0]
  // let members = result[0];

  let [members] = await pool.execute('SELECT * FROM members WHERE email = ?', [req.body.email]);
  if (members.length === 0) {
    // 密碼要雜湊 hash
    let hashedPassword = await bcrypt.hash(req.body.password, 10);

    //  資料存到資料庫
    let result = await pool.execute('INSERT INTO members (email, password, name) VALUES (?, ?, ?);', [req.body.email, hashedPassword, req.body.name]);
    console.log('insert new member', result);
    //  回覆前端
    res.json({ message: 'OK' });
  } else {
    // 有重複 -> 註冊過
    // 如果有，回覆 400 跟錯誤訊息
    return res.status(400).json({ message: '該email已被使用' });
  }
});

module.exports = router;
