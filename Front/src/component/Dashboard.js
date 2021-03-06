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


const Dashboard = () => {
  let [msg, upd] = useState([]);
  let [cards, updCards] = useState([]);
  let [total, updTotal] = useState(0);
  const logout = async () => {
    cookies.remove('token');
    setTimeout(() => { window.location.replace(process.env.REACT_APP_PATH); }, 50);
    // fetch('http://localhost:1337/logout');
  }
  useEffect(async () => {
    if (cookies.get('token') == undefined)
      setTimeout(() => { window.location.replace(process.env.REACT_APP_PATH); }, 0);
    else
      try {
        let token = cookies.get('token');
        let ans = await fetch(process.env.REACT_APP_BACKEND+'user-spec?token=' + token);
        ans = await ans.json();
        console.log(ans);
        let t = 'آقا/خانم ' + ans['firstname'] + ' ' + ans['lastname'] + ' خوش آمدید! <br /> ایمیل شما: ' + ans['email'];
        upd(t);
        ans = await fetch(process.env.REACT_APP_BACKEND+'get-cart?token=' + token);
        ans = await ans.json();
        console.log(ans);
        if (ans['response'] != '') {
          let temp = [];
          let f = 0;
          temp.push(
            <div>
              <div className='row'>
                <div className="col-sm-2" style={{ textAlign: 'center' }}>
                  نام
                </div>
                <div className="col-sm-2" style={{ textAlign: 'center' }}>
                  نویسنده
                </div>
                <div className="col-sm-2" style={{ textAlign: 'center' }}>
                  ناشر
                </div>
                <div className="col-sm-2" style={{ textAlign: 'center' }}>
                  قیمت
                </div>
                <div className="col-sm-1" style={{ textAlign: 'center' }}>
                  تعداد
                </div>
              </div>
            </div>
          );
          ans['response'].forEach((item, index) => {
            console.log(item['name']);
            f = f + +item['price'] * +item['number'];
            temp.push(
              <div>
                <div className='row'>
                  <div className="col-sm-2" style={{ textAlign: 'center', fontSize: 'smaller' }}>
                    <Link to={"/book/" + item['id']}>
                      <div style={{ color: 'black' }}>
                        {item['name']}
                      </div>
                    </Link>
                  </div>
                  <div className="col-sm-2" style={{ textAlign: 'center', fontSize: 'smaller' }}>
                    {item['author']}
                  </div>
                  <div className="col-sm-2" style={{ textAlign: 'center', fontSize: 'smaller' }}>
                    {item['publisher']}
                  </div>
                  <div className="col-sm-2" style={{ textAlign: 'center', fontSize: 'smaller' }}>
                    {item['price']}
                  </div>
                  <div className="col-sm-1" style={{ textAlign: 'center', fontSize: 'smaller' }}>
                    {item['number']}
                  </div>
                </div>
              </div>
            );
          });
          temp.push(
            <div>
              <div className='row'>
                <div className="col-sm-3" style={{ textAlign: 'center' }}>
                  قیمت کل: {f}
                </div>
              </div>
            </div>
          );
          updCards(temp);
        } else
          updCards('شما خریدی نداشتید.');
      } catch {
        upd('No connection to backend!');
      }
  }, []);
  return (
    <>
      <h3 style={{ textAlign: 'center', marginTop: '30px' }}>مدیریت حساب</h3>
      <div style={{ padding: '2%' }}>
        <div className="row" style={{ direction: 'ltr', marginBottom: '1%' }}>
          <div className="col-sm-2">
          </div>
          <div dangerouslySetInnerHTML={{ __html: msg }} className="col-sm-8" style={{ borderRadius: '3px', textAlign: 'right', direction: 'rtl' }}></div>
          <div className="col-sm-2">
          </div>
        </div>
        <div className="row" style={{ direction: 'ltr', marginBottom: '1%' }}>
          <div className="col-sm-2">
          </div>
          <div className="col-sm-6" style={{ borderRadius: '3px', textAlign: 'right', direction: 'rtl' }}>
            {cards}
          </div>
          <div className="col-sm-2" style={{ borderRadius: '3px', textAlign: 'center', direction: 'rtl' }}>
            خریدهای شما:
          </div>
          <div className="col-sm-2">
          </div>
        </div>
        <div className="row" style={{ direction: 'ltr' }}>
          <div className="col-sm-1">
          </div>
          <div className="col-sm-10" style={{ borderRadius: '3px', textAlign: 'right' }}>
            <Link to="/changepass">
              <a href="#">
                <div style={{ color: 'black' }}> میخواهید رمز خود را تغییر دهید؟</div>
              </a>
            </Link>
          </div>
          <div className="col-sm-1">
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