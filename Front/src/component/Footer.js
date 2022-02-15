import React, { memo, useState, useCallback, } from 'react';
import trust_img from '../Trust.png'
import logo_img from '../logo.png'
import book_img from '../Book.png'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

const Footer = () => {
  return (
    <>
      {/* <hr class="mt-2 mb-3" /> */}
      <div className='row bg-dark footer' style={{ paddingTop: '2%', paddingBottom: '2%', paddingTop: '4%' }}>
        <div className="col-sm-12">
          <div class="dropdown-divider bg-dark" style={{ width: '75%', margin: 'auto' }}></div>
        </div>
      </div>
      <div className='row bg-dark footer' style={{ paddingTop: '2%', paddingBottom: '2%' }}>
        <div className="col-sm-2" style={{ marginRight: '0px', paddingRight: '0px' }}>

        </div>
        <div className="col-sm-4" style={{ marginRight: '0px', paddingRight: '0px', textAlign: 'right', color: 'white' }}>
          ما را دنبال کنید: <br />
          <a href="#" class="fa fa-facebook"></a>
          <a href="#" class="fa fa-linkedin"></a>
          <a href="#" class="fa fa-youtube"></a>
          {/* <a href="#" class="fa fa-instagram"></a>
          <a href="#" class="fa fa-skype"></a> */}
        </div>
        <div className="col-sm-6" style={{ marginRight: '0px', paddingRight: '0px', textAlign: 'right', color: 'white' }}>
          به ما اعتماد کنید: <br />
          <img src={trust_img} style={{ width: '20%' }} />
          <img src={book_img} style={{ width: '20%', boxShadow: '3px 3px 3px 3px #888888', borderRadius: '50%', backgroundColor: '#fff8dcc9', padding: '1%', marginRight: '3%' }} />
        </div>
        <div className="col-sm-2" style={{ marginRight: '0px', paddingRight: '0px' }}>

        </div>
      </div>
      <div className='row bg-dark footer' style={{ paddingTop: '2%', paddingBottom: '2%', paddingTop: '4%' }}>
        <div className="col-sm-12">
          <h6 class="bg-dark" style={{ width: '75%', margin: 'auto', color: 'white' }}>Copyright Ⓒ All Reserved by VAF Company</h6>
        </div>
      </div>
    </>
  );
};

export default React.memo(Footer)