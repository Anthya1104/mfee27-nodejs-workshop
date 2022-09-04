import { API_URL, IMAGE_URL } from '../utilis/config';
import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Logo from '../img/fish.png';
import axios from 'axios';
import { useAuth } from '../context/auth';

// TODO: try -> useState useEffect -> 一跳轉就 render 一次 member 初始資料
const Navbar = () => {
  const { member, setMember } = useAuth();
  const handleLogout = async () => {
    let response = await axios.get(`${API_URL}/auth/logout`, {
      withCredentials: true,
    });
    console.log(response.data);
    setMember(null);
  };

  return (
    <nav className="bg-indigo-100 px-10 py-3 flex justify-between items-center sticky shadow">
      <Link to={'/'}>
        <div className="flex items-center cursor-pointer">
          <img src={Logo} width="50" alt="Logo" className="mr-2" />
          <span className="text-2xl text-gray-700 text-opacity-70">魚股市</span>
        </div>
      </Link>

      <div className="flex items-center ">
        <NavLink to="/" className="text-xl text-gray-700 text-opacity-70 mx-3 md:mx-6 hover:text-opacity-90" activestyle={{ fontWeight: 'bold', color: '#3B82F6' }}>
          股票
        </NavLink>
        <NavLink to="/about" className="text-xl text-gray-700 text-opacity-70 mx-3 md:mx-6 hover:text-opacity-90" activestyle={{ fontWeight: 'bold', color: '#3B82F6' }}>
          關於
        </NavLink>
        {member ? (
          <>
            {/* 登入後顯示的 */}
            Hi, 王大明
            {/* TODO: issue : 目前跳轉後 img 路徑會失效 需要重新整理才會跑出來 */}
            {/* 此時 member.photo -> undefied */}
            {/* 未刷新前 -> member: saveMember */}
            {/* 刷新後 -> member: 
             {
                  "id": 1,
                  "name": "111",
                  "email": "1234567@test.com",
                  "photo": "/uploads/member-1662190302716.png"
              }*/}
            {/* 刷新前的資料多了一層array */}
            {console.log(member)}
            {console.log(member.photo)}
            <img alt="icon" src={IMAGE_URL + member.photo} style={{ width: '80px' }} />
            <Link to="/about" onClick={handleLogout} className="text-xl text-gray-700 text-opacity-70 mx-3 md:mx-6 hover:text-opacity-90">
              登出
            </Link>
          </>
        ) : (
          <>
            {/* 登入前顯示的 */}
            <NavLink to="/login" className="text-xl text-gray-700 text-opacity-70 mx-3 md:mx-6 hover:text-opacity-90" activestyle={{ fontWeight: 'bold', color: '#3B82F6' }}>
              登入
            </NavLink>
            <NavLink to="/register" className="text-xl text-gray-700 text-opacity-70 mx-3 md:mx-6 hover:text-opacity-90" activestyle={{ fontWeight: 'bold', color: '#3B82F6' }}>
              註冊
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
