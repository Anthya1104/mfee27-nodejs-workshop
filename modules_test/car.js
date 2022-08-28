// exports = module.exports = {}; //預設底層會加

// solution1 先寫好物件 最後匯出
let car = {
  name: 'aaa',
  getName: function () {
    return 'bbb';
  },
  age: 18,
};

module.exports = car;

// solution 2 一行一行寫
// exports.name = 'aaa';

// exports.getName = () => {
//   return 'bbb';
// };

// module.exports.age = 18;

// return module.exports; //預設底層會加
