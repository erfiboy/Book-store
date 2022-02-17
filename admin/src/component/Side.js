import React from "react";
import { Nav } from "react-bootstrap";
import { withRouter } from "react-router";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

const Side = props => {
  return (
    <>
      {/* <Nav className="col-md-12 d-none d-md-block bg-dark sidebar"> */}
      <div id="mySidenav" class="sidenav bg-dark">
        <Nav.Item style={{ paddingBottom: '1%', paddingTop: '1%' }}>
          <Link className="nav-link" to="/dashboard">داشبورد JefBook</Link>
        </Nav.Item>
        <Nav.Item style={{ paddingBottom: '1%', paddingTop: '1%' }}>
          <Link className="nav-link" to="/addauthor">نویسنده</Link>
        </Nav.Item>
        <Nav.Item style={{ paddingBottom: '1%', paddingTop: '1%' }}>
          <Link className="nav-link" to="/addcategory">دسته بندی ها</Link>
        </Nav.Item>
        <Nav.Item style={{ paddingBottom: '1%', paddingTop: '1%' }}>
          <Link className="nav-link" to="/addbook">کتاب ها</Link>
        </Nav.Item>
        {/* <Nav.Item style={{paddingBottom: '1%',paddingTop: '1%'}}>
          <Link className="nav-link" to="/">Active</Link>
        </Nav.Item> */}
      </div>
      {/* </Nav> */}
    </>
  );
};

export default Side