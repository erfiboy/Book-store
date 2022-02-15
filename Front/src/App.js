import './App.css';
import Cookies from 'universal-cookie'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Menu from './component/Menu'
import Footer from './component/Footer'
import Home from './component/Home'
import About from './component/About'
import Login from './component/Login'
import Signup from './component/Signup'
import Dashboard from './component/Dashboard'
import Changepass from './component/Changepass'
import P404 from './component/P404'

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { Header } from 'antd/lib/layout/layout';

const cookies = new Cookies();
// cookies.remove('token','wow!')

function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/changepass" element={<Changepass />} />
        <Route path="*" element={<P404 />} />
      </Routes>
      <Footer />
    </>

  );
}

export default App;