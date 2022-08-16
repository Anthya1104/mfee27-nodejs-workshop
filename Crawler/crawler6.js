const fs = require('fs/promises');
const axios = require('axios');
const moment = require('moment');
//先導入套件 之後用來把資料寫入資料庫
const mysql = require('mysql2');
//密碼直接寫進去太危險 可以用dotenv套件轉換
require('dotenv').config();

let queryDate = moment().format('YYYYMMDD');
let stockNo;
let connection;

async function getStack(queryDate, stockNo) {
  try {
    //先建立連線
    connection = mysql.createConnection({
      host: process.env.DB_HOST,
      //預設就是3306 但還是寫出來 可以降低出錯風險
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    //從stock.txt 讀取股票代碼
    stockNo = await fs.readFile('stock.txt', 'utf8');
    //TODO:去查詢股票代碼的中文名稱

    let queryNameResponse = await axios('https://www.twse.com.tw/zh/api/codeQuery', {
      params: {
        query: stockNo,
      },
    });

    //抓名字
    let suggestions = queryNameResponse.data.suggestions;
    //如果有成功抓到API suggestions陣列裡至少會有第一格存在
    let suggestion = suggestions[0];
    if (suggestion === '(無符合之代碼或名稱)') {
      console.error(suggestion);
      //丟錯誤出來阻斷後續執行
      throw new Error(suggestion);
    }
    // console.log('suggestion:', suggestion);
    //先分割陣列 再用pop取最後一個(萬一複數名字 會拿到第一個 還是會抓得到其中一個名字)
    let stockName = suggestion.split('\t').pop();
    console.log(stockName);
    //execute能做到: 把後面放的陣列資料放進問號裡
    let connectionResponse = connection.execute(`INSERT IGNORE INTO stocks (id, name) VALUES (?, ?)`, [stockNo, stockName]);
    console.log(connectionResponse);
    // connection.execute(`INSERT INTO stocks (id, name) VALUES ('${stockNo}','${stockName}')`);
    //自己串 sql 字串不太好 有安全上的風險 sql injection
    //connection.query() --> execute不能用才用 盡量不要用

    // //抓股票資料
    // const response = await axios.get(`https://www.twse.com.tw/exchangeReport/STOCK_DAY`, {
    //   params: {
    //     response: 'json',
    //     date: queryDate,
    //     stockNo: stockNo,
    //   },
    // });
    // console.log(response.data);
  } catch (e) {
    console.error(e);
  } finally {
    if (connection) {
      connection.end();
    }
  }
}

getStack(queryDate, stockNo);
