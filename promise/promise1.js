//Promise 是一個表示非同步運算的最終完成或失敗的物件。
// - 物件 new Promise();
//建構式 Promise，需要傳一個參數executor
//new Promise(executor);
//executor：也是個函式，有兩個參數 resolve, reject
//function executor(resolve, reject)
//(resolve, reject) => {}
//- 非同步：把非同步程式碼搬進executor裡面
//- 最終完成：resolve -> resolve(資料)
//- 最終失敗：reject -> reject(失敗原因)

function doWork(job, timer) {
  //因為是物件 可以new
  //把非同步運算的工作放入指定的executor裡
  return new Promise((resolve, reject) => {
    //記得要return!!!!!
    setTimeout(() => {
      let dt = new Date();
      //如果失敗
      //reject(失敗原因)
      //setTimeout()不會失敗 這邊省略reject 直接呼叫成功
      // reject({ error: '故意失敗' });
      // 如果成功
      // resolve(結果)
      resolve(`完成工作 ${job} at ${dt.toISOString()}`);
    }, timer);
  });
}

let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);
// 刷牙(3) => 吃早餐(5) => 寫功課(3)
let brushPromise = doWork('brush', 3000);
let eatPromise = doWork('breakfast', 5000);
let homeWorkPromise = doWork('homework', 3000);

console.log(brushPromise); // pending -> 表示還不知道結果
brushPromise
  .then((data) => {
    // 用來接住 resolve 後的東西
    console.log('在 promise 裡', data);
    //這裡隱含了一個 return Promise()
    //所以這裡可以指定return 下一件想做的工作
    return eatPromise;
  })
  .then((data) => {
    console.log('在 promise 裡', data);
    return homeWorkPromise;
  })
  .then((data) => {
    console.log('在 promise 裡', data);
  })
  .catch((err) => {
    // 用來接住 reject
    console.error('在 promise 發生錯誤:', err);
  });
