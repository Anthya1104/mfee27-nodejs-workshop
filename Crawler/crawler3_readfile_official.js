const fs = require('fs/promises');
const axios = require('axios');
const moment = require('moment');
let queryDate = moment().format('YYYYMMDD');
let stockNo = '';

async function getStack(queryDate, stockNo) {
  try {
    stockNo = await fs.readFile('stock.txt', 'utf8');
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
