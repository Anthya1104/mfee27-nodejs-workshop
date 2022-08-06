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
  //只有在這裡，當callback被呼叫的時候
  //才能確定這件事情做完了
  if (err) {
    console.error('發生錯誤', err);
    //early return
    //}後面就不需要再接else
    return;
  }
  console.log('執行成功', data);
});

//反向寫法
// doWork('刷牙', 3000, function (err, data) {
//   if (!err) {
//     console.log('執行成功', data);
//     return;
//   }
//   console.error('發生錯誤', err);
// });

//以上兩種if-else寫法都有一樣的效果
//但通常會選擇判斷式中「正向」(無!)的寫法
//OR
//看一下if-else中分別要處理的程式哪個比較短
//且if-else後沒有其他工作時
//會把比較短的放在上面，並接return

doWork('吃早餐', 8000, function (err, data) {
  if (err) {
    console.error('發生錯誤', err);
    return;
  }
  console.log('執行成功', data);
});

doWork('寫功課', 11000, function (err, data) {
  if (err) {
    console.error('發生錯誤', err);
    return;
  }
  console.log('執行成功', data);
});

//solution 2

doWork('刷牙', 3000, function (err, data) {
  if (err) {
    console.error('發生錯誤', err);
    return;
  }
  console.log('執行成功', data);

  doWork('吃早餐', 5000, function (err, data) {
    if (err) {
      console.error('發生錯誤', err);
      return;
    }
    console.log('執行成功', data);

    doWork('寫功課', 3000, function (err, data) {
      if (err) {
        console.error('發生錯誤', err);
        return;
      }
      console.log('執行成功', data);
    });
  });
});

//homework
