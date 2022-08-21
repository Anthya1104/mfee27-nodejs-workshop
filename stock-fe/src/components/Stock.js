import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Stock = () => {
  const [error, setError] = useState(null);
  // 會抓出陣列 所以預設值給個空陣列
  const [data, setData] = useState([]);
  // setData是個非同步 所以不能在setData() 呼叫完後直接做事情 (因為可能事情還沒做完)
  // 要用useEffect -> 做完setData()之後再做

  // 後面的陣列 很重要 代表第一次執行時給予的東西
  // 初始化
  useEffect(() => {
    // 在這裡 call API
    // react希望寫法:
    let getStock = async () => {
      console.log('stock', 'useEffect []');
      let response = await axios.get('http://localhost:3001/api/1.0/stocks');
      setData(response.data);
      // 這裡不能拿 抓到的資料來用 因為上面是非同步
    };
    getStock();
  }, []);

  // 這裡才能使用
  // 每次data改變都會呼叫
  useEffect(() => {
    console.log('stock', 'useEffect[data]');
    console.log('stock', data);
  }, [data]);

  return (
    <div>
      {error && <div>{error}</div>}
      <h2 className="ml-7 mt-6 text-xl text-gray-600">股票代碼</h2>

      {data.map((stock, idx) => {
        return (
          <div className="bg-white bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg m-6 cursor-pointer">
            <Link to={`/stock/${stock.id}`}>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">{stock.id}</h2>
              <p className="text-gray-700">{stock.name}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Stock;
