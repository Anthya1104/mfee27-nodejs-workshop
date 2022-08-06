function doWork(job, timer) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let dt = new Date();
      resolve(`完成工作 ${job} at ${dt.toISOString()}`);
    }, timer);
  });
}

let dt = new Date();
console.log('開始工作 at' + dt.toISOString());

doWork('brush', 3000)
  .then((data) => {
    console.log(`在 promise 裡${data}`);
    return doWork('eat', 5000);
  })
  .then((data) => {
    console.log(`在 promise 裡${data}`);
    return doWork('homeWork', 3000);
  })
  .then((data) => {
    console.log(`在 promise 裡${data}`);
  })
  .catch((err) => {
    console.log(`挖哩咧在promise裡出錯了: ${err}`);
  });
