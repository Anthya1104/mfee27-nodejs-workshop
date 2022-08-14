const fs = require('fs');
const axios = require('axios');
const moment = require('moment');
let queryDate = moment().format('YYYYMMDD');
let stockNo = '';
let p = new Promise((resolve, reject) => {
  fs.readFile('stock.txt', 'utf8', (err, data) => {
    if (err) {
      return reject(err);
    }
    resolve(data);
  });
});

async function getStack(queryDate, stockNo) {
  try {
    stockNo = await p;
    const response = await axios.get(`https://www.twse.com.tw/exchangeReport/STOCK_DAY`, {
      params: {
        response: 'json',
        date: queryDate,
        stockNo: stockNo,
      },
    });
    console.log(response.data);
  } catch (e) {
    console.log(e);
  }
}

getStack(queryDate, stockNo);
