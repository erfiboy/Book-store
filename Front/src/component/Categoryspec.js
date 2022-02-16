import React, { memo, useEffect, useState, useCallback, } from 'react';
import { useParams } from 'react-router-dom';
import booktestimg from '../Book.jpg'
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
      console.log('http://localhost:1337/list?category=' + name);
      ans = await ans.json();
      console.log(ans);
      let t = [];
      ans['response'].forEach((item, index) => {
        t.push(
          <div className="col-sm-3">
            <div className="card">
              <img className="card-img-top" src={booktestimg} alt="Card image cap" />
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
      upd(t);
    } catch {
      upd('No connection to backend!');
    }
  }, []);
  return (
    <>
      <h3 style={{ textAlign: 'center', marginTop: '30px', direction: 'rtl' }}>دسته {name}</h3>
      <div style={{ padding: '2%' }}>
        <div className="row">
          {itemList}
        </div>
      </div>

    </>
  );
};

export default React.memo(Writersspec)