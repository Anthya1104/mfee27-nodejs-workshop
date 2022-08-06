function doWork(job, timer, cb) {
  setTimeout(() => {
    let dt = new Date();
    cb(null, `完成工作 ${job} at ${dt.toISOString()}`);
  }, timer);
}

//callback hell問題
//目前順序 brush -> eat -> homework
//如果想改順序 homework -> eat -> brush
//很難改

//所以ES52多了個新寫法 -> promise

//目前希望盡量不要寫callback 寫成promise比較好

let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);

//刷牙
function brush() {
  doWork('刷牙', 3000, function (err, data) {
    if (err) {
      console.error('發生錯誤', err);
      return;
    }
    console.log('執行成功', data);
    eat();
  });
}

//吃早餐
function eat() {
  doWork('吃早餐', 5000, function (err, data) {
    if (err) {
      console.error('發生錯誤', err);
      return;
    }
    console.log('執行成功', data);
    homework();
  });
}

function homework() {
  doWork('寫功課', 3000, function (err, data) {
    if (err) {
      console.error('發生錯誤', err);
      return;
    }
    console.log('執行成功', data);
  });
}

brush();
