import React, { memo, useEffect, useState, useCallback, } from 'react';
import Parse from 'parse'
import Logo from '../logo.png'
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";

const Writers = () => {
  let [author_list, upd] = useState([]);
  useEffect(async () => {
    try {
      let ans = await fetch('http://localhost:1337/author/list');
      ans = await ans.json();
      console.log(ans['response']);
      let t = [];
      ans['response'].forEach((item, index) => {
        t.push(
          <div className="row">
            <div className="col-sm-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{item['name']}</h5>
                  <p className="card-text">قیمت: {item['price']}</p>
                  <p className="card-text">نویسنده: {item['author']}</p>
                  <p className="card-text">خلاصه: {item['summary']}</p>
                  <Link to={"/book/" + item['id']} className="btn btn-primary">اطلاعات بیشتر</Link>
                </div>
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
      <h3 style={{ textAlign: 'center', marginTop: '30px' }}>About Us</h3>
      <div style={{ padding: '2%' }}>
        <div className="row" style={{ direction: 'rtl' }}>
          <div className="col-sm-2">
          </div>
          <div className="col-sm-1" style={{ textAlign: 'left' }}>
            نویسندگان:
          </div>
          <div className="col-sm-7" style={{ textAlign: 'right' }}>
            {author_list}
          </div>
          <div className="col-sm-2">
          </div>
        </div>
      </div>

    </>
  );
};

export default React.memo(Writers)