import React, { memo, useEffect, useState, useCallback, } from 'react';
import { useParams } from 'react-router-dom';
import Noimage from '../Book.jpg'
import Parse from 'parse'
import Logo from '../logo.png'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

const Writersspec = () => {
  let { name } = useParams();
  console.log(name);
  let [itemList, upd] = useState([]);
  useEffect(async () => {
    try {
      let ans = await fetch('http://localhost:1337/list?category=' + name);
      ans = await ans.json();
      console.log(ans);
      let t = [];
      ans['response'].forEach((item, index) => {
        if (item['image'] != undefined)
          t.push(
            <div className="col-sm-3">
              <div className="card">
                <img className="card-img-top" src={'http://localhost:1337/' + item['image']} height='400px' alt="Card image cap" />
                <div className="card-body">
                  <h5 className="card-title">{item['name']}</h5>
                  <p className="card-text">قیمت: {item['price']}</p>
                  <p className="card-text">نویسنده: {item['author']}</p>
                  <p className="card-text">خلاصه: {item['summary']}</p>
                  <Link to={"/book/" + item['id']} className="btn btn-primary">اطلاعات بیشتر</Link>
                </div>
              </div>
            </div>
          )
        else
          t.push(
            <div className="col-sm-3">
              <div className="card">
                <img className="card-img-top" src={Noimage} height='400px' alt="Card image cap" />
                <div className="card-body">
                  <h5 className="card-title">{item['name']}</h5>
                  <p className="card-text">قیمت: {item['price']}</p>
                  <p className="card-text">نویسنده: {item['author']}</p>
                  <p className="card-text">خلاصه: {item['summary']}</p>
                  <Link to={"/book/" + item['id']} className="btn btn-primary">اطلاعات بیشتر</Link>
                </div>
              </div>
            </div>
          )
      })
      if (ans['response'].length == 0) {
        t.push(
          <div style={{ textAlign: 'center' }}>هیچ کتابی از این نویسنده در دسترس نیست! منتظر بمانید!</div>
        )
      }
      upd(t);
    } catch {
      upd('No connection to backend!');
    }
  }, []);
  return (
    <>
      <h3 style={{ textAlign: 'center', marginTop: '30px', direction: 'rtl' }}>مشاهده دسته {name}</h3>
      <div style={{ padding: '2%' }}>
        <div className="row">
          {itemList}
        </div>
      </div>

    </>
  );
};

export default React.memo(Writersspec)