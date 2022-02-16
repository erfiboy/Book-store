import React, { memo, useEffect, useState, useCallback, } from 'react';
import Parse from 'parse'
import Logo from '../logo.png'
import booktestimg from '../Book.jpg'
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import Cookies from 'universal-cookie'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";


const cookies = new Cookies();


const Changepass = () => {
  let oldpass, newpass;
  let [msg, upd] = useState('');
  console.log(cookies.get('token'))
  useEffect(async () => {
    // console.log('BBB ' + cookies.get('token'))
    if (cookies.get('token') == undefined)
      setTimeout(() => { window.location.replace('http://localhost:3000'); }, 0);
  }, []);
  const onFinish = async (values) => {
    try {
      let ans = await fetch('http://localhost:1337/change-pass?curpassword=' + oldpass + '&newpassword=' + newpass + '&token=' + cookies.get('token'));
      ans = await ans.json();
      console.log(ans)
      console.log('http://localhost:1337/change-pass?curpassword=' + oldpass + '&newpassword=' + newpass + '&token=' + cookies.get('token'))
      if (ans['response'] != 'successful') {
        throw 'رمز عبور اشتباه است.';
      }
      setTimeout(() => { window.location.replace('http://localhost:3000/dashboard'); }, 500);
      upd('<div class="alert alert-success" role="alert">رمز عبور تغییر یافت. مننتظر بمانید.</div>');
    } catch (err) {
      upd('<div class="alert alert-danger" role="alert">' + err + '</div>');
      console.log(err);
    }
  };
  return (
    <>
      <h3 style={{ textAlign: 'center', marginTop: '30px' }}>مدیریت حساب</h3>
      <h5 style={{ textAlign: 'center', marginTop: '30px' }}>تغییر رمز عبور</h5>
      <div style={{ padding: '2%' }}>
        <div className="row" style={{ direction: 'ltr', marginBottom: '1%' }}>
          <div className="col-sm-2">
          </div>
          <div className="col-sm-8" style={{ borderRadius: '3px', textAlign: 'right', direction: 'rtl' }}>
            <input id="password-field" type="password" name="pass" className="form-control" onChange={evt => { oldpass = evt.target.value; }} placeholder="رمز عبور قدیمی" required />
          </div>
          <div className="col-sm-2">
          </div>
        </div>
        <div className="row" style={{ direction: 'ltr', marginBottom: '1%' }}>
          <div className="col-sm-2">
          </div>
          <div className="col-sm-8" style={{ borderRadius: '3px', textAlign: 'right', direction: 'rtl' }}>
            <input id="password-field" type="password" name="pass" className="form-control" onChange={evt => { newpass = evt.target.value; }} placeholder="رمز عبور جدید" required />
          </div>
          <div className="col-sm-2">
          </div>
        </div>
        <div className="row" style={{ direction: 'ltr' }}>
          <div className="col-sm-4">
          </div>
          <div className="col-sm-4" style={{ borderRadius: '3px', textAlign: 'center' }}>
            <button htmlType="button" style={{ width: '100%', borderRadius: '3px !important' }} className="form-control btn btn-primary submit px-3 bg-dark" onClick={onFinish} >
              تغییر رمز
            </button>
            <div style={{direction: 'rtl'}} dangerouslySetInnerHTML={{ __html: msg }}></div>
          </div>
          <div className="col-sm-4">
          </div>
        </div>
      </div>

    </>
  );
};

export default React.memo(Changepass)