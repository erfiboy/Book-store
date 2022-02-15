import React, { memo, useState, useCallback, } from 'react';
import Logo from '../logo.png'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

const Menu = () => {
  return (
    <>
      <div className='row bg-dark' style={{ marginRight: '0px', marginLeft: '0px' }}>
        <div className="col-sm-10" style={{ marginRight: '0px', paddingRight: '0px' }}>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ direction: 'rtl', zIndex: '10', paddingRight: '0px', paddingLeft: '0px' }}>
            <a className="navbar-brand" href="#" style={{ marginRight: '5%', color: 'white', verticalAlign: 'sub' }}>
              <img src={Logo} width="60" height="60" className="d-inline-block align-top" alt="" />
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav2" aria-controls="navbarNav2" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">خانه</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/books">کتاب ها</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/writers">نویسندگان</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">درباره ما</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="col-sm-2 d-none d-sm-block" style={{ width: '25%', margin: 'auto', textAlign: 'center' }}>
          <Link className="btn btn-outline-light" to="/login" >ورود</Link>
        </div>
      </div>
      <div style={{ color: 'white', direction: 'rtl', textAlign: 'right' }} className="collapse navbar-collapse bg-dark" id="navbarNav2">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/">خانه</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/books">کتاب ها</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/writers">نویسندگان</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">درباره ما</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">ورود</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default React.memo(Menu)