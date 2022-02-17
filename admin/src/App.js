import './App.css';
import Cookies from 'universal-cookie'
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Side from './component/Side'
import Dashboard from './component/Dashboard'
import Author from './component/Author'
import Category from './component/Category'
import Login from './component/Login'
import Book from './component/Book'

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
      <Row style={{ direction: 'rtl' }}>
        <Col xs={2} style={{ paddingRight: '0', paddingLeft: '0' }} id="sidebar-wrapper">
          <Side />
        </Col>
        <Col xs={10} style={{ paddingRight: '0', paddingLeft: '0', direction: 'rtl', textAlign: 'right' }} id="page-content-wrapper">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addauthor" element={<Author />} />
            <Route path="/addcategory" element={<Category />} />
            <Route path="/addbook" element={<Book />} />
          </Routes>
        </Col>
      </Row>
    </>
  );
}

export default App;