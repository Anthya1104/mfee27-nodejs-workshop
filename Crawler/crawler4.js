const fs = require('fs/promises');
const axios = require('axios');
const moment = require('moment');
let queryDate = moment().format('YYYYMMDD');
let stockNo = '';

async function getStack(queryDate, stockNo) {
  try {
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
    //先分割陣列 再用pop取最後一個(萬一沒有中文名字 會拿到第一個 還是會抓得到其中一個名字)
    let stockName = suggestion.split('\t').pop();
    console.log(stockName);

    //抓股票資料
    const response = await axios.get(`https://www.twse.com.tw/exchangeReport/STOCK_DAY`, {
      params: {
        response: 'json',
        date: queryDate,
        stockNo: stockNo,
      },
    });
    console.log(response.data);
  } catch (e) {
    console.error(e);
  }
}

getStack(queryDate, stockNo);
