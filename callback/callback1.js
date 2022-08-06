function doWork(job, timer, cb) {
  setTimeout(() => {
    let dt = new Date();
    //呼叫callback慣用設計
    //第一個參數:error (先給個null)
    //第二個參數: 正確執行時要回覆的資料
    cb(null, `完成工作 ${job} at ${dt.toISOString()}`);
  }, timer);
}

let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);

//刷牙
doWork('刷牙', 3000, function (err, data) {
  if (err) {
    console.error('發生錯誤', err);
  } else {
    console.log('執行成功', data);
  }
});

doWork('吃早餐', 8000, function (err, data) {
  if (err) {
    console.error('發生錯誤', err);
  } else {
    console.log('執行成功', data);
  }
});

doWork('寫功課', 11000, function (err, data) {
  if (err) {
    console.error('發生錯誤', err);
  } else {
    console.log('執行成功', data);
  }
});

//solution 2

doWork('刷牙', 3000, function (err, data) {
  if (err) {
    console.error('發生錯誤', err);
  } else {
    console.log('執行成功', data);
  }
  doWork('吃早餐', 5000, function (err, data) {
    if (err) {
      console.error('發生錯誤', err);
    } else {
      console.log('執行成功', data);
    }
    doWork('寫功課', 3000, function (err, data) {
      if (err) {
        console.error('發生錯誤', err);
      } else {
        console.log('執行成功', data);
      }
    });
  });
});
