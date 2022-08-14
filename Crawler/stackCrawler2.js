// https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20220813&stockNo=2330&_=1660378706329
//用地三方套件前 第一步一定要安裝 e.g. npm -i axios

const axios = require('axios');
const moment = require('moment');
let queryDate = moment().format('YYYYMMDD');

async function getStack(queryDate, stockNo) {
  try {
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

getStack(queryDate, 2330);
