import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const StockDetails = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  // 把網址上的 :stockId 拿出來
  const { stockId } = useParams();
  console.log('StockDetail - stockId', stockId);
  // 去後端撈資料

  // 1. axios.get -> 在哪個 useEffect 裡做？

  // 2. setData
  useEffect(() => {
    let getStockDetail = async () => {
      let response = await axios.get(`http://localhost:3001/api/1.0/stocks/${stockId}`);
      setData(response.data);
    };
    getStockDetail();
  }, []);
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div>
      {error && <div>{error}</div>}
      <div className="bg-white bg-gray-50 p-6 rounded-lg shadow m-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">日期：</h2>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">成交金額：</h2>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">成交股數：</h2>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">開盤價：</h2>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">收盤價：</h2>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">漲跌價差：</h2>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">最高價：</h2>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">最低價：</h2>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">成交筆數：</h2>
      </div>
    </div>
  );
};

export default StockDetails;
