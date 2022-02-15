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

const cookies = new Cookies();


const Dashboard = () => {
  let [itemList, upd] = useState([]);
  const logout = () => {
    cookies.remove('token');
    setTimeout(() => { window.location.replace('http://localhost:3000'); }, 50);
  }
  useEffect(async () => {
    if(cookies.get('token')==undefined)
      setTimeout(() => { window.location.replace('http://localhost:3000'); }, 0);
    try {
      let ans = await fetch('http://localhost:1337/list');
      ans = await ans.json();
      console.log(ans['response']);
      let t = [];
      ans['response'].forEach((item, index) => {
        t.push(
          <div className="col-sm-3">
            <div className="card">
              <img className="card-img-top" src={booktestimg} height='400px' alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">{item['name']}</h5>
                <p className="card-text">قیمت: {item['price']}</p>
                <p className="card-text">نویسنده: {item['author']}</p>
                <a href="#" className="btn btn-primary">اطلاعات بیشتر</a>
              </div>
            </div>
          </div>
        )
      })
      upd(t);
    } catch {
      upd('No connection to backend!');
    }
  }, []);
  return (
    <>
      <h3 style={{ textAlign: 'center', marginTop: '30px' }}>پنل کاربری</h3>
      <div style={{ padding: '2%' }}>
        <div className="row" style={{ direction: 'ltr' }}>
          <div className="col-sm-2">
          </div>
          <div className="col-sm-4" style={{ borderRadius: '3px', textAlign: 'center' }}>
            خریدهای شما:
          </div>
          <div className="col-sm-4" style={{ borderRadius: '3px', textAlign: 'center' }}>

          </div>
          <div className="col-sm-2">
          </div>
        </div>
        <div className="row" style={{ direction: 'ltr' }}>
          <div className="col-sm-1">
          </div>
          <div className="col-sm-10" style={{ borderRadius: '3px', textAlign: 'center' }}>
            <button htmlType="button" style={{ width: '100%', borderRadius: '3px !important' }} className="form-control btn btn-primary submit px-3 bg-dark" onClick={logout} >
              خروج
            </button>
          </div>
          <div className="col-sm-1">
          </div>
        </div>
      </div>

    </>
  );
};

export default React.memo(Dashboard)