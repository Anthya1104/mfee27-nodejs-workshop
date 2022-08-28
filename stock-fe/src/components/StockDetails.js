import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../utilis/config';

const StockDetails = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  // 總頁數 -> 預設只有1頁
  const [lastPage, setLastPage] = useState(1);
  // 目前頁數 -> 預設第一頁
  const [page, setPage] = useState(1);

  // 把網址上的 :stockId 拿出來
  const { stockId } = useParams();
  console.log('StockDetail - stockId', stockId);
  // 去後端撈資料
  useEffect(() => {
    let getStockDetail = async () => {
      let response = await axios.get(`${API_URL}/stocks/${stockId}?page=${page}`);
      setData(response.data.data);
      // 從後端取得總頁數 {lastPage}
      setLastPage(response.data.pagination.lastPage);
    };
    getStockDetail();
  }, [page]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  // 製作頁碼按鈕
  const getPage = () => {
    let pages = [];
    for (let i = 1; i <= lastPage; i++) {
      pages.push(
        <li
          style={{
            display: 'inline-block',
            margin: '2px',
            backgroundColor: page === i ? '#00d1b2' : '',
            borderColor: page === i ? '#00d1b2' : '#dbdbdb',
            color: page === i ? '#fff' : '#363636',
            borderWidth: '1px',
            width: '28px',
            height: '28px',
            borderRadius: '3px',
            textAlign: 'center',
          }}
          key={i}
          onClick={(e) => {
            setPage(i);
          }}
        >
          {i}
        </li>
      );
    }
    return pages;
  };
  return (
    <div>
      {error && <div>{error}</div>}
      {/* 放頁碼 */}
      <ul className="d-flex justify-content-center mt-5">{getPage()}</ul>
      {data.map((item) => {
        const newTime = item.date.slice(0, 10);
        return (
          <div className="bg-white bg-gray-50 p-6 rounded-lg shadow m-6" key={item.date}>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">日期：{newTime}</h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">成交金額：{item.amount}</h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">成交股數：{item.volume}</h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">開盤價：{item.open_price}</h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">收盤價：{item.close_price}</h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">漲跌價差：{item.delta_price}</h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">最高價：{item.high_price}</h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">最低價：{item.low_price}</h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">成交筆數：{item.transactions}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default StockDetails;
