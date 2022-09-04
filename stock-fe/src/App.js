import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { API_URL } from './utilis/config';
import About from './components/About';
import { AuthContext } from './context/auth';
import Login from './components/Login';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import Register from './components/Register';
import Stock from './components/Stock';
import StockDetails from './components/StockDetails';
import axios from 'axios';

function App() {
  const [member, setMember] = useState(null);
  useEffect(() => {
    let getMember = async () => {
      console.log('in APP: check if login');
      let response = await axios.get(`${API_URL}/member`, { withCredentials: true });
      setMember(response.data);
    };
    getMember();
  }, []);
  return (
    <AuthContext.Provider value={{ member, setMember }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Stock />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/stock/:stockId" element={<StockDetails />}>
            <Route path=":currentPage" element={<StockDetails />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
