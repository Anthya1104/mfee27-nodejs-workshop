// https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20220813&stockNo=2330&_=1660378706329
//用地三方套件前 第一步一定要安裝 e.g. npm -i axios

const axios = require('axios');
axios
  .get('https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20220813&stockNo=2330&_=1660378706329')
  .then((response) => {
    // console.log(response);
    console.log(response.data);
  })
  .catch(console.error);
