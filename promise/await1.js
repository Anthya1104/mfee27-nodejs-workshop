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

//non-blocking
//await ->暫停鍵 先把工作外包出去 再跳出去大括號做別的事，等到被await的promise resolve做完再丟回來解除暫停
//如直接寫外面會報錯: 因為await只能出現在async函式中(必須規範可以暫停的範圍)
//但await沒有報錯機制，需要配合try-catch function

//開發習慣上不會把await跟then混在一起寫
//因為容易搞混執行順序

async function test() {
  try {
    //try let內就可以用if-else處理流程
    let brushResult = await doWork('刷牙', 3000);
    console.log('await brush', brushResult);

    let eatResult = await doWork('吃早餐', 5000);
    console.log('await eat', eatResult);

    let homeWorkResult = await doWork('寫功課', 3000);
    console.log('await eat', homeWorkResult);
  } catch (err) {
    console.log(err);
  }
  return 'a';
  //不要在async中return值 因為主要是用來處理promise await 一般情況下會在第一個await就被擋下來 只能印出pending
}
let testResult = test();
//除非最後再用.then印出testResult 這樣才會印出return值a
testResult.then((data) => {
  console.log('testResult:', data);
});
//實際上這一行會最先跑出來
console.log('finish', testResult);
